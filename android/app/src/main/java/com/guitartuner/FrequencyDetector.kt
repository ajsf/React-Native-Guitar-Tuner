package com.guitartuner

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.paramsen.noise.Noise
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers
import kotlin.math.sqrt

class FrequencyDetector(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val sampleRate = RATE_HZ
    private val fftInSize = SAMPLE_SIZE
    private val noise = Noise.real().optimized().init(fftInSize, false)
    private val disposable = CompositeDisposable()

    override fun getName(): String {
        return "FrequencyDetector"
    }

    @ReactMethod
    fun listen() {
        val src = AudioSource().stream()
        val input = src.observeOn(Schedulers.io())

        val frequencies = input.filter { calculateRMS(it) > 250 }
                .map { noise.fft(it, FloatArray(fftInSize + 2)) }
                .map { calculateFrequency(it) }

        val silence = input
                .filter { calculateRMS(it) < 250 }
                .map { -1f }

        val response = frequencies.mergeWith(silence).distinctUntilChanged()

        disposable.add(response.subscribe({ sendEvent(it) }))
    }

    @ReactMethod
    fun stopListening() {
        disposable.clear()
    }

    private fun calculateRMS(timeseries: FloatArray): Float {
        val sum = timeseries.map { it * it }.sum()
        val amplitude = sum / timeseries.size
        val rms = sqrt(amplitude)
        Log.d(TAG, "RMS: $rms")
        return rms
    }

    private fun calculateFrequency(fft: FloatArray): Float {
        val amplitudes = calculateAmplitudes(fft)
        val ampHarmonics = addHarmonics(amplitudes)
        val topFreqIndex = ampHarmonics.indexOf(ampHarmonics.max())
        val freq = (topFreqIndex / (amplitudes.size.toFloat() * 2)) * sampleRate
        Log.d(TAG, "Freq: $freq")
        return freq
    }

    private fun calculateAmplitudes(fft: FloatArray): List<Float> {
        val blockSize = fft.size / 2
        return (0 until blockSize).map { i ->
            val real = fft[i * 2]
            val imag = fft[i * 2 + 1]
            sqrt((real * real) + (imag * imag)) / blockSize
        }
    }

    private fun addHarmonics(amplitudes: List<Float>): List<Float> {
        val maxHarmonics = 3
        val freqDbHarmonic = amplitudes.toMutableList()
        for (j in 2..maxHarmonics) {
            var lowBin = 0
            var newValue = 0
            for (i in 0 until amplitudes.size) {
                val nextBin = (i / j.toDouble()).toInt()
                if (nextBin > lowBin) {
                    freqDbHarmonic[lowBin] = newValue + freqDbHarmonic[lowBin]
                    lowBin = nextBin
                    newValue = 0
                }
                newValue = maxOf(newValue, amplitudes[i].toInt())
            }
        }
        return freqDbHarmonic
    }

    private fun sendEvent(freq: Float) {
        val params = Arguments.createMap()
        params.putDouble("freq", freq.toDouble())
        Log.d(TAG, "emitting")
        this.reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit("frequency", params)
    }

    companion object {
        private val TAG = "FrequencyDetector"
    }
}
