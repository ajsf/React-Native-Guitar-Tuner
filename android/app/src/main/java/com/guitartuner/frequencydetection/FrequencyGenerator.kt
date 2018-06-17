package com.guitartuner.frequencydetection

import com.guitartuner.RATE_HZ

fun generateSineWave(signalFrequency: Int, seconds: Int): FloatArray {
    val sin = FloatArray(seconds * RATE_HZ)
    for (i in 0 until sin.size) {
        sin[i] = Math.sin(2 * Math.PI * i * signalFrequency / RATE_HZ.toDouble()).toFloat() * 127
    }
    return sin
}