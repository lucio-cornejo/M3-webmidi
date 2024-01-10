const VITE_MIDI_CONTROLLER_NAME = 'MIDIIN2 (LPX MIDI)';
const VITE_VIRTUAL_MIDI_NAME = 'loopMIDI Port';

function onEnabled() {
  console.log('MIDI enabled!');

  WebMidi.inputs.forEach(input => console.log(input.name, input.id));
  WebMidi.outputs.forEach(output => console.log(output.name, output.id));

  const midiController = WebMidi.getInputByName(VITE_MIDI_CONTROLLER_NAME);
  const virtualMidiOutput = WebMidi.getOutputByName(VITE_VIRTUAL_MIDI_NAME);

  const soundChannel = virtualMidiOutput.channels[1];
  console.log(virtualMidiOutput.channels);

  return {
    "midiController" : midiController, 
    "midiChannel" : soundChannel,
  }
}

let midiController, midiChannel;

(async function() {
  window["midiControls"] = await WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

  window["midiControls"]["midiController"]
    .addListener("noteon", MidiPlayNote);
  
  window["midiControls"]["midiController"]
    .addListener("noteoff", MidiStopNote);

})();

