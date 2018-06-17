package com.guitartuner.frequencydetection

import kotlin.math.sqrt

class FrequencyDetector(
        private val sampleRate: Int, private val fftGenerator: FFTGenerator) {

    fun detectFrequency(timeseries: FloatArray, threshold: Int = 250): Float {
        if (calculateRMS(timeseries) < threshold) return -1f
        val fft = fftGenerator.getFFT(timeseries)
        return calculateFrequency(fft)
    }

    fun open() {
        fftGenerator.open()
    }

    fun close() {
        fftGenerator.close()
    }

    private fun calculateRMS(timeseries: FloatArray): Float {
        val sum = timeseries.map { it * it }.sum()
        val amplitude = sum / timeseries.size
        return sqrt(amplitude)
    }

    private fun calculateFrequency(fft: FloatArray): Float {
        val amplitudes = calculateAmplitudes(fft)
        val ampHarmonics = addHarmonics(amplitudes)
        val topFreqIndex = ampHarmonics.indexOf(ampHarmonics.max())
        return (topFreqIndex / (amplitudes.size.toFloat() * 2)) * sampleRate
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
}
