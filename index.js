import SynthEngine from "./sound.js";

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
  synth.triggerAttackRelease("c5", 4)
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

//Function to scale a number between two values
function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return (
    ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
  );
}

function toggleValue(id, val) {
  switch (id) {
    case "bitcrusher":
      console.log("bit");
      val == 0 ? synth.setBitcrusher(0) : synth.setBitcrusher(1);
      break;
    case "phaser":
      console.log("bit");
      val == 0 ? synth.setPhaser(0) : synth.setPhaser(0.7);
      break;
  }
}

function changeValue(id, value) {
  switch (id) {
    case "mod-index":
      console.log("modcase");
      synth.setModulationIndex(value);
      break;
    case "harmonicity":
      synth.setHarmonicity(value);
      break;
    case "noise":
      synth.setNoise(scaleBetween(value, -60, 10, 0, 100));
      break;
    case "cutoff":
      synth.setCutoff(scaleBetween(value, 20, 20000, 0, 100));
      break;
    case "resonance":
      synth.setResonance(scaleBetween(value, 0, 50, 0, 100));
      break;
    case "attack":
      synth.setAttack(scaleBetween(value, 0, 2, 0, 100));
      break;
    case "release":
      synth.setRelease(scaleBetween(value, 0, 2, 0, 100));
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
