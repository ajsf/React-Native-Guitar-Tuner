package com.guitartuner

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.guitartuner.frequencydetection.*
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.schedulers.Schedulers

class RNFrequencyDetectorBridge(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val sampleRate = RATE_HZ
    private val fftInSize = SAMPLE_SIZE
    private val disposable = CompositeDisposable()
    private val fftGenerator = FFTGeneratorImpl(fftInSize)
    private val detector = FrequencyDetector(sampleRate, fftGenerator)

    override fun getName(): String {
        return "RNFrequencyDetectorBridge"
    }

    @ReactMethod
    fun listen() {
        val src = AudioSource().stream()
        val input = src.observeOn(Schedulers.io())
        val response = input.map { detector.detectFrequency(it) }.distinctUntilChanged()
        disposable.add(response.subscribe({
            Log.d(TAG, it.toString())
            sendEvent(it)
        }))
    }

    @ReactMethod
    fun stopListening() {
        detector.close()
        disposable.clear()
    }

    private fun sendEvent(freq: Float) {
        val params = Arguments.createMap()
        params.putDouble("freq", freq.toDouble())
        Log.d(TAG, "emitting")
        this.reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit("frequency", params)
    }

    companion object {
        private val TAG = "FrequencyDetectorBridge"
    }
}
