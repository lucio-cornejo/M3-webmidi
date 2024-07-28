import React from 'react';
import './App.css'

import { NotesGrid } from './components/NotesGrid';
import { SetNotesGridOctaveShift } from './setNotesGridOctaveShift';


import midiControls from './connect-browser-to-DAW'
const { midiController, midiChannel } = midiControls;


export const App = () => {
  const initialOctaveShift = 0;
  const [notesGridOctaveShift, setNotesGridOctaveShift] = React.useState(initialOctaveShift);
  const updateNotesGridOctaveShift = (newNotesGridOctaveShift) => {
    midiController.octaveOffset = newNotesGridOctaveShift;
    setNotesGridOctaveShift(newNotesGridOctaveShift);
  }

  /*
  const MidiPlayNote = (e) => {
    console.log(e.note.identifier);
    midiChannel.playNote(e.note.identifier, {attack : e.velocity});
  }
  
  const MidiStopNote = (e) => {
    console.log(e.note.identifier);
    midiChannel.stopNote(e.note.identifier);
  }
  
  React.useEffect(() => {
    midiController.addListener("noteon", MidiPlayNote);
    midiController.addListener("noteoff", MidiStopNote);
    
    return () => {
      midiController.removeListener("noteon", MidiPlayNote);
      midiController.removeListener("noteoff", MidiStopNote);
    }
  }, [notesGridOctaveShift])

  */


// midiChannel;
//   .sendPitchBend(-0.5)
//   .sendPitchBend(0.5, {time:'+200ms'})



  return (
    <>
      <SetNotesGridOctaveShift 
        updateNotesGridOctaveShift={updateNotesGridOctaveShift}
      />
      <NotesGrid
        baseNote={`C${2 + notesGridOctaveShift}`}
        numCols={8}
        numRows={8}
        rightShift={4}
        downShift={1}
      />
  </>
  )
}
