package com.guitartuner.frequencydetection

interface FFTGenerator {
    fun getFFT(timeseries: FloatArray): FloatArray
    fun close()
}
