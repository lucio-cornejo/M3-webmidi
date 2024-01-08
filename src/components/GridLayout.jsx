import WebmidiTest from './../connect-browser-to-DAW'
const { midiController, midiChannel } = await WebmidiTest();

// midiChannel;
//   .sendPitchBend(-0.5)
//   .sendPitchBend(0.5, {time:'+200ms'})
