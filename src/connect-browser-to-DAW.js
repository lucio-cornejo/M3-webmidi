import { WebMidi } from "webmidi";
const { VITE_MIDI_CONTROLLER_NAME, VITE_VIRTUAL_MIDI_NAME } = import.meta.env;

let midiController, soundChannel;
export default function WebmidiTest() {
  WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

  function onEnabled() {
    console.log('MIDI enabled!');

    WebMidi.inputs.forEach(input => console.log(input.name, input.id));
    WebMidi.outputs.forEach(output => console.log(output.name, output.id));
  
    midiController = WebMidi.getInputByName(VITE_MIDI_CONTROLLER_NAME);
    const virtualMidiOutput = WebMidi.getOutputByName(VITE_VIRTUAL_MIDI_NAME);

    soundChannel = virtualMidiOutput.channels[1];
    console.log(virtualMidiOutput.channels);

    midiController.addListener("noteon", e => {
      console.log(e.note.identifier);
      soundChannel.playNote(e.note.identifier, {attack : e.velocity});
    });

    midiController.addListener("noteoff", e => {
      soundChannel.stopNote(e.note.identifier);
    });

    console.log(1, midiController, soundChannel);
  }


  console.log(2, midiController, soundChannel);
  return {
    "midiController" : midiController,
    "midiChannel" : soundChannel,
  }
}

    // soundChannel;
      // .sendPitchBend(-0.5)
      // .sendPitchBend(0.5, {time:'+200ms'})

