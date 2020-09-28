import * as Tone from "tone";

class SynthEngine {
  constructor(polyphony) {
    this.bitCrusher = new Tone.BitCrusher({ bits: 6, wet: 0 });
    this.phaser = new Tone.Phaser({
      frequency: 0.5,
      octaves: 3,
      baseFrequency: 1000,
      wet: 0,
    });
    this.delay = new Tone.FeedbackDelay({ time: 0.5, feedback: 0.5, wet: 0 });
    this.voiceMaster = new Tone.Volume(0);
    this.volume = new Tone.Volume().chain(
      this.bitCrusher,
      this.phaser,
      this.delay,
      this.voiceMaster,
      Tone.Master
    );
    this.voices = this._createVoices(polyphony);
    this.voiceCounter = 0;
  }

  setMasterVolume(val) {
    this.voiceMaster.set({ volume: val });
  }

  setBitcrusher(val) {
    this.bitCrusher.set({ wet: val });
  }
  setPhaser(val) {
    this.phaser.set({ wet: val });
  }

  setModulationIndex(val) {
    this.voices.forEach((voice) => {
      voice.fmOsc.set({ modulationIndex: val });
    });
  }

  setHarmonicity(val) {
    this.voices.forEach((voice) => {
      voice.fmOsc.set({ harmonicity: val });
    });
  }

  setNoise(val) {
    this.voices.forEach((voice) => {
      voice.noiseOsc.set({ volume: val });
    });
  }

  setCutoff(val) {
    this.voices.forEach((voice) => {
      voice.filter.set({ frequency: val });
    });
  }
  setResonance(val) {
    this.voices.forEach((voice) => {
      voice.filter.set({ Q: val });
    });
  }

  setAttack(val) {
    this.voices.forEach((voice) => {
      voice.ampEnvelope.set({ attack: val });
    });
  }

  setRelease(val) {
    this.voices.forEach((voice) => {
      voice.ampEnvelope.set({ release: val });
    });
  }

  setLevel(val) {
    this.voices.forEach((voice) => {
      voice.volume.set({ volume: val });
    });
  }

  setDelay(val) {
    this.delay.set({ delayTime: val });
  }

  setDelayFeedback(val) {
    this.delay.set({ feedback: val });
  }

  setDelayLevel(val) {
    this.delay.set({ wet: val });
  }

  _createVoices(polyphony) {
    const voiceArray = [];
    for (let i = 0; i < polyphony; i++) {
      const voice = new SynthVoice();
      voice.volume.connect(this.volume);
      voiceArray.push(voice);
    }
    return voiceArray;
  }
  _nextVoice() {
    if (this.voiceCounter === this.voices.length - 1) {
      this.voiceCounter = 0;
    } else {
      this.voiceCounter += 1;
    }
  }
  triggerAttackRelease(note, time = "4t") {
    console.log(this.voiceCounter);
    this.voices[this.voiceCounter].triggerAttackRelease(note, time);
    this._nextVoice();
  }
}

class SynthVoice {
  constructor() {
    this.volume = new Tone.Volume(-12);
    this.ampEnvelope = new Tone.AmplitudeEnvelope({ attack: 0, release: 0 });
    this.fmOsc = new Tone.FMOscillator({
      harmonicity: 0,
      modulationIndex: 0,
    }).start();
    this.noiseOsc = new Tone.Noise({ type: "white", volume: -60 }).start();
    this.filter = new Tone.Filter(20000, "lowpass");
    this.fmOsc.connect(this.filter);
    this.noiseOsc.connect(this.filter);
    this.filter.connect(this.ampEnvelope);
    this.ampEnvelope.connect(this.volume);
  }

  triggerAttackRelease(note, time) {
    this.fmOsc.set({ frequency: [this.fmOsc.toFrequency(note)] });
    this.ampEnvelope.triggerAttackRelease(time);
  }
}

export default SynthEngine;
