import { WebMidi } from "webmidi";
const { VITE_MIDI_CONTROLLER_NAME, VITE_VIRTUAL_MIDI_NAME } = import.meta.env;

const midiControls = await WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => alert(err));

function onEnabled() {
  console.log('MIDI enabled!');

  WebMidi.inputs.forEach(input => console.log(input.name, input.id));
  WebMidi.outputs.forEach(output => console.log(output.name, output.id));

  const midiController = WebMidi.getInputByName(VITE_MIDI_CONTROLLER_NAME);
  const virtualMidiOutput = WebMidi.getOutputByName(VITE_VIRTUAL_MIDI_NAME);

  const soundChannel = virtualMidiOutput.channels[1];
  // console.log(virtualMidiOutput.channels);

  midiController.addForwarder(virtualMidiOutput, { channels: 1, });

  return {
    "midiController" : midiController, 
    "midiChannel" : soundChannel,
  }
}

export default midiControls;
