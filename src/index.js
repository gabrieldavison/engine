import SynthEngine from "./sound.js";
import * as Tone from "tone";
import WebMidi from "./midi";
import UIController from "./ui";

import { bc } from "./broadcastChannel";
import KeyboardController from "./keyboard.js";

bc.onmessage = function (ev) {
  synth.triggerAttackRelease(ev.data[0], ev.data[1]);
};

//Button to start audio context
const startAudio = document.getElementById("start-sound");
startAudio.addEventListener("click", async () => {
  await Tone.start();
  console.log("audio is ready");
});

const synth = new SynthEngine(4);
const UI = new UIController(synth);
const keyboard = new KeyboardController(synth);

// Event listener for sliders
const synthSliders = document.querySelectorAll(".slider");
synthSliders.forEach((slider) => {
  slider.addEventListener("input", (e) => {
    UI.setValue(e.target.id, e.target.value);
  });
});

//Event listener for toggles
const synthToggles = document.querySelectorAll(".toggle");
synthToggles.forEach((toggle) => {
  toggle.addEventListener("change", (e) => {
    UI.toggleValue(e.target.id, e.target.value);
  });
});

//Event listeners for keys
window.addEventListener("keydown", (e) => keyboard.handleKeydown(e));
window.addEventListener("keyup", (e) => keyboard.handleKeyup(e));
