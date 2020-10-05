export default class KeyboardController {
  constructor(synth) {
    this.synth = synth;
    this.heldKeys = [];
    this.scale = [
      "c",
      "c#",
      "d",
      "d#",
      "e",
      "f",
      "f#",
      "g",
      "g#",
      "a",
      "a#",
      "b",
    ];
    this.notes = this.generateNotes();
  }
  generateNotes() {
    const notesArr = [];
    //Lowest octave of keyboard
    let octave = 3;
    for (let i = 0; i < 40; i++) {
      if (i !== 0 && i % this.scale.length === 0) {
        octave += 1;
      }
      notesArr.push(this.scale[i % this.scale.length] + octave);
    }
    return notesArr;
  }

  handleKeydown(e) {
    if (this.heldKeys.includes(e.key)) return;
    console.log("keydown");
    switch (e.key) {
      case "1":
        this.triggerKey(e.key, this.notes[0]);
        break;
      case "2":
        this.triggerKey(e.key, this.notes[1]);
        break;
      case "3":
        this.triggerKey(e.key, this.notes[2]);
        break;
      case "4":
        this.triggerKey(e.key, this.notes[3]);
        break;
      case "5":
        this.triggerKey(e.key, this.notes[4]);
        break;
      case "6":
        this.triggerKey(e.key, this.notes[5]);
        break;
      case "7":
        this.triggerKey(e.key, this.notes[6]);
        break;
      case "8":
        this.triggerKey(e.key, this.notes[7]);
        break;
      case "9":
        this.triggerKey(e.key, this.notes[8]);
        break;
      case "0":
        this.triggerKey(e.key, this.notes[9]);
        break;
      case "q":
        this.triggerKey(e.key, this.notes[10]);
        break;
      case "w":
        this.triggerKey(e.key, this.notes[11]);
        break;
      case "e":
        this.triggerKey(e.key, this.notes[12]);
        break;
      case "r":
        this.triggerKey(e.key, this.notes[13]);
        break;
      case "t":
        this.triggerKey(e.key, this.notes[14]);
        break;
      case "y":
        this.triggerKey(e.key, this.notes[15]);
        break;
      case "u":
        this.triggerKey(e.key, this.notes[16]);
        break;
      case "i":
        this.triggerKey(e.key, this.notes[17]);
        break;
      case "o":
        this.triggerKey(e.key, this.notes[18]);
        break;
      case "p":
        this.triggerKey(e.key, this.notes[19]);
        break;
      case "a":
        this.triggerKey(e.key, this.notes[20]);
        break;
      case "s":
        this.triggerKey(e.key, this.notes[21]);
        break;
      case "d":
        this.triggerKey(e.key, this.notes[22]);
        break;
      case "f":
        this.triggerKey(e.key, this.notes[23]);
        break;
      case "g":
        this.triggerKey(e.key, this.notes[24]);
        break;
      case "h":
        this.triggerKey(e.key, this.notes[25]);
        break;
      case "j":
        this.triggerKey(e.key, this.notes[26]);
        break;
      case "k":
        this.triggerKey(e.key, this.notes[27]);
        break;
      case "l":
        this.triggerKey(e.key, this.notes[28]);
        break;
      case ";":
        this.triggerKey(e.key, this.notes[29]);
        break;
      case "z":
        this.triggerKey(e.key, this.notes[30]);
        break;
      case "x":
        this.triggerKey(e.key, this.notes[31]);
        break;
      case "c":
        this.triggerKey(e.key, this.notes[32]);
        break;
      case "v":
        this.triggerKey(e.key, this.notes[33]);
        break;
      case "b":
        this.triggerKey(e.key, this.notes[34]);
        break;
      case "n":
        this.triggerKey(e.key, this.notes[35]);
        break;
      case "m":
        this.triggerKey(e.key, this.notes[36]);
        break;
      case ",":
        this.triggerKey(e.key, this.notes[37]);
        break;
      case ".":
        this.triggerKey(e.key, this.notes[38]);
        break;
      case "/":
        this.triggerKey(e.key, this.notes[39]);
        break;
      default:
        return;
    }
  }

  handleKeyup(e) {
    console.log("keyup");
    if (this.heldKeys.includes(e.key)) {
      const keyIndex = this.heldKeys.indexOf(e.key);
      this.heldKeys.splice(keyIndex, 1);
      this.synth.handleNoteOff(e.key);
    }
  }

  triggerKey(key, note) {
    this.heldKeys.push(key);
    this.synth.handleNoteOn(key, note);
  }
}
