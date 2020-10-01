import SynthEngine from "./sound.js";
import * as Tone from "tone";
import WebMidi from "./midi";

import { bc } from "./broadcastChannel";

bc.onmessage = function (ev) {
  console.log(ev);
  synth.triggerAttackRelease(ev.data[0], ev.data[1]);
};

//Button to start audio context
const startAudio = document.getElementById("start-sound");
startAudio.addEventListener("click", async () => {
  await Tone.start();
  console.log("audio is ready");
});

const synth = new SynthEngine(4);

//Button to trigger note
const playNoteButton = document.getElementById("play-note");
playNoteButton.addEventListener("click", () =>
  synth.triggerAttackRelease("c5", 1)
);

// Event listeners for sliders
const synthSliders = document.querySelectorAll(".slider");

synthSliders.forEach((slider) => {
  slider.addEventListener("input", (e) => {
    changeValue(e.target.id, e.target.value);
  });
});

//Event Listeners for toggles
const synthToggles = document.querySelectorAll(".toggle");

synthToggles.forEach((toggle) => {
  toggle.addEventListener("change", (e) => {
    toggleValue(e.target.id, e.target.value);
  });
});

function toggleValue(id, val) {
  switch (id) {
    case "bitcrusher":
      val == 0 ? synth.setBitcrusher(0) : synth.setBitcrusher(1);
      break;
    case "phaser":
      val == 0 ? synth.setPhaser(0) : synth.setPhaser(0.7);
      break;
    case "mute":
      val == 0 ? synth.setMasterVolume(0) : synth.setMasterVolume(-60);
      break;
  }
}

function changeValue(id, value) {
  switch (id) {
    case "mod-index":
      synth.setModulationIndex(value);
      break;
    case "harmonicity":
      synth.setHarmonicity(scaleBetween(value, 0, 40, 0, 100));
      break;
    case "noise":
      synth.setNoise(scaleBetween(value, -60, 10, 0, 100));
      break;
    case "cutoff":
      synth.setCutoff(scaleBetween(value, 20, 8000, 0, 100));
      break;
    case "resonance":
      synth.setResonance(scaleBetween(value, 0, 50, 0, 100));
      break;
    case "attack":
      synth.setAttack(scaleBetween(value, 0, 2, 0, 100));
      break;
    case "release":
      synth.setRelease(scaleBetween(value, 0.1, 2, 0, 100));
      break;
    case "level":
      synth.setLevel(scaleBetween(value, -60, 10, 0, 100));
      break;
    case "delay":
      synth.setDelay(scaleBetween(value, 0, 1, 0, 100));
      break;
    case "delay-feedback":
      synth.setDelayFeedback(scaleBetween(value, 0, 1, 0, 100));
      break;
    case "delay-level":
      synth.setDelayLevel(scaleBetween(value, 0, 1, 0, 100));
      break;
  }
}

//Event listeners for keys

const heldKeys = [];

window.addEventListener("keydown", (e) => handleKeydown(e));
window.addEventListener("keyup", (e) => handleKeyup(e));

const scale = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
const notes = generateNotes();

function generateNotes() {
  const notesArr = [];
  let octave = 3;
  for (let i = 0; i < 40; i++) {
    if (i !== 0 && i % scale.length === 0) {
      octave += 1;
    }
    notesArr.push(scale[i % scale.length] + octave);
  }
  return notesArr;
}

function handleKeydown(e) {
  if (heldKeys.includes(e.key)) return;
  console.log("keydown");
  switch (e.key) {
    case "1":
      triggerKey(e.key, notes[0]);
      break;
    case "2":
      triggerKey(e.key, notes[1]);
      break;
    case "3":
      triggerKey(e.key, notes[2]);
      break;
    case "4":
      triggerKey(e.key, notes[3]);
      break;
    case "5":
      triggerKey(e.key, notes[4]);
      break;
    case "6":
      triggerKey(e.key, notes[5]);
      break;
    case "7":
      triggerKey(e.key, notes[6]);
      break;
    case "8":
      triggerKey(e.key, notes[7]);
      break;
    case "9":
      triggerKey(e.key, notes[8]);
      break;
    case "0":
      triggerKey(e.key, notes[9]);
      break;
    case "q":
      triggerKey(e.key, notes[10]);
      break;
    case "w":
      triggerKey(e.key, notes[11]);
      break;
    case "e":
      triggerKey(e.key, notes[12]);
      break;
    case "r":
      triggerKey(e.key, notes[13]);
      break;
    case "t":
      triggerKey(e.key, notes[14]);
      break;
    case "y":
      triggerKey(e.key, notes[15]);
      break;
    case "u":
      triggerKey(e.key, notes[16]);
      break;
    case "i":
      triggerKey(e.key, notes[17]);
      break;
    case "o":
      triggerKey(e.key, notes[18]);
      break;
    case "p":
      triggerKey(e.key, notes[19]);
      break;
    case "a":
      triggerKey(e.key, notes[20]);
      break;
    case "s":
      triggerKey(e.key, notes[21]);
      break;
    case "d":
      triggerKey(e.key, notes[22]);
      break;
    case "f":
      triggerKey(e.key, notes[23]);
      break;
    case "g":
      triggerKey(e.key, notes[24]);
      break;
    case "h":
      triggerKey(e.key, notes[25]);
      break;
    case "j":
      triggerKey(e.key, notes[26]);
      break;
    case "k":
      triggerKey(e.key, notes[27]);
      break;
    case "l":
      triggerKey(e.key, notes[28]);
      break;
    case ";":
      triggerKey(e.key, notes[29]);
      break;
    case "z":
      triggerKey(e.key, notes[30]);
      break;
    case "x":
      triggerKey(e.key, notes[31]);
      break;
    case "c":
      triggerKey(e.key, notes[32]);
      break;
    case "v":
      triggerKey(e.key, notes[33]);
      break;
    case "b":
      triggerKey(e.key, notes[34]);
      break;
    case "n":
      triggerKey(e.key, notes[35]);
      break;
    case "m":
      triggerKey(e.key, notes[36]);
      break;
    case ",":
      triggerKey(e.key, notes[37]);
      break;
    case ".":
      triggerKey(e.key, notes[38]);
      break;
    case "/":
      triggerKey(e.key, notes[39]);
      break;
    default:
      return;
  }
}

function handleKeyup(e) {
  console.log("keyup");
  if (heldKeys.includes(e.key)) {
    const keyIndex = heldKeys.indexOf(e.key);
    heldKeys.splice(keyIndex, 1);
    synth.handleNoteOff(e.key);
  }
}

function triggerKey(key, note) {
  heldKeys.push(key);
  synth.handleNoteOn(key, note);
}

//Function to scale a number between two values
function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return (
    ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
  );
}
