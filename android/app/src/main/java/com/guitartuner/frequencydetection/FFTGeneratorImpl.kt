package com.guitartuner.frequencydetection

import com.paramsen.noise.Noise

class FFTGeneratorImpl(private val fftInSize: Int) : FFTGenerator {

    private val noise = Noise.real().optimized().init(fftInSize, false)

    override fun getFFT(timeseries: FloatArray): FloatArray {
        return noise.fft(timeseries, FloatArray(fftInSize + 2))
    }

    override fun close() {
        noise.dispose()
    }
}