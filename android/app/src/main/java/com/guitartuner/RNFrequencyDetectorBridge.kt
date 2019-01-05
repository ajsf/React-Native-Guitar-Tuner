package com.guitartuner

import android.util.Log
import be.tarsos.dsp.AudioDispatcher
import be.tarsos.dsp.io.android.AudioDispatcherFactory
import be.tarsos.dsp.pitch.PitchDetectionHandler
import be.tarsos.dsp.pitch.PitchProcessor
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class RNFrequencyDetectorBridge(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var audioThread: Thread? = null
    private var dispatcher: AudioDispatcher? = null
    private val pdh = PitchDetectionHandler { res, event ->
        Log.d("PITCH", "detected: ${res.pitch}. dbls: ${event.getdBSPL()}")
        if (event.isSilence(-72.0).not()) {
            sendEvent(res.pitch)
        }
    }
    private val pitchProcessor = PitchProcessor(PitchProcessor.PitchEstimationAlgorithm.FFT_YIN, 22050f, 1024, pdh)

    override fun getName(): String {
        return "RNFrequencyDetectorBridge"
    }

    @ReactMethod
    fun listen() {
        dispatcher = AudioDispatcherFactory.fromDefaultMicrophone(22050, 1024, 0)
        dispatcher?.addAudioProcessor(pitchProcessor)
        audioThread = Thread(dispatcher, "Audio Thread")
        audioThread?.start()
    }

    @ReactMethod
    fun stopListening() {
        dispatcher?.removeAudioProcessor(pitchProcessor)
        dispatcher?.stop()
        dispatcher = null
        audioThread?.interrupt()
        audioThread = null
    }

    private fun sendEvent(freq: Float) {
        val params = Arguments.createMap()
        params.putDouble("freq", freq.toDouble())
        Log.d(TAG, "emitting: $freq")
        this.reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit("frequency", params)
    }

    companion object {
        private val TAG = "FrequencyDetectorBridge"
    }
}
