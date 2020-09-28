import WebMidi from "webmidi";

WebMidi.enable(function (err) {
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);
});
