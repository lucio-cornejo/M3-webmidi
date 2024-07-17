import React from 'react';
import './App.css'

import { NotesGrid } from './components/NotesGrid';
import { SetNotesGridOctaveShift } from './setNotesGridOctaveShift';


import midiControls from './connect-browser-to-DAW'
const { midiController, midiChannel } = midiControls;


const shiftOctave = (noteString, octaveShift) => {
  const octave = noteString.match(/\d/g)[0];
  const shiftedOctave = noteString
    .replace(/\d/g, (parseInt(octave) + octaveShift).toString());

  return shiftedOctave;
}


// Allow notes grid octave shift to be modified, in order to 
// trigger re-render of notes grid, via multiple components
// Source: https://medium.com/@christopherthai/why-you-shouldnt-pass-react-s-setstate-as-a-prop-a-deep-dive-8a3dcd74bec8
export const notesGridOctaveShiftContext = React.createContext();

export const App = () => {
  const initialOctaveShift = 2;
  const [notesGridOctaveShift, setNotesGridOctaveShift] = React.useState(initialOctaveShift);
  const updateNotesGridOctaveShift = (newNotesGridOctaveShift) => setNotesGridOctaveShift(newNotesGridOctaveShift);

  const MidiPlayNote = (e) => {
    const shiftedOctave = shiftOctave(e.note.identifier, notesGridOctaveShift - initialOctaveShift);
    console.log(
      e.note.identifier, shiftedOctave
    )
  
    midiChannel.playNote(shiftedOctave, {attack : e.velocity});
    // midiChannel.playNote(e.note.identifier, {attack : e.velocity});
  }
  
  const MidiStopNote = (e) => {
    const shiftedOctave = shiftOctave(e.note.identifier, notesGridOctaveShift - initialOctaveShift);
    midiChannel.stopNote(shiftedOctave);
    // midiChannel.stopNote(e.note.identifier);
  }
  
  React.useEffect(() => {
    midiController.addListener("noteon", MidiPlayNote);
    midiController.addListener("noteoff", MidiStopNote);
    
    return () => {
      midiController.removeListener("noteon", MidiPlayNote);
      midiController.removeListener("noteoff", MidiStopNote);
    }
  }, [notesGridOctaveShift])


// midiChannel;
//   .sendPitchBend(-0.5)
//   .sendPitchBend(0.5, {time:'+200ms'})



  return (
    <notesGridOctaveShiftContext.Provider 
      value={{ notesGridOctaveShift, updateNotesGridOctaveShift }}
    > 
      <SetNotesGridOctaveShift/>

      <NotesGrid
        baseNote={`C${notesGridOctaveShift}`}
        numCols={8}
        numRows={8}
        rightShift={4}
        downShift={1}
      />

    </notesGridOctaveShiftContext.Provider>
  )
}
