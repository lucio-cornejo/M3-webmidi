const shiftOctave = (noteString, octaveShift) => {
  const octave = noteString.match(/\d/g)[0];
  const shiftedOctave = noteString
    .replace(/\d/g, (parseInt(octave) + octaveShift).toString());

  return shiftedOctave;
}

window["count"] = 0;

const MidiPlayNote = (e) => {
  const shiftedOctave = shiftOctave(e.note.identifier, window["count"]);
  console.log(
    e.note.identifier, shiftedOctave
  )

  window["midiControls"]["midiChannel"].playNote(shiftedOctave, {attack : e.velocity});
  // midiChannel.playNote(e.note.identifier, {attack : e.velocity});
}

const MidiStopNote = (e) => {
  const shiftedOctave = shiftOctave(e.note.identifier, window["count"]);
  window["midiControls"]["midiChannel"].stopNote(shiftedOctave);
  // midiChannel.stopNote(e.note.identifier);
}


const octaveDown = () => { 
  window["midiControls"]["midiChannel"].sendAllNotesOff();
  window['count'] -= 1;
};
const octaveUp = () => { 
  window["midiControls"]["midiChannel"].sendAllNotesOff();
  window['count'] += 1;
};