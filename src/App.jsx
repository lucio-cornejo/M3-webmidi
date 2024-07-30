import { useState } from 'react';
import './App.css'

import { NotesGrid } from './components/NotesGrid';
import { SetNotesGridOctaveShift } from './setNotesGridOctaveShift';
import PitchBendSlider from './components/PitchBendSlider';

import midiControls from './connect-browser-to-DAW'
const { midiController } = midiControls;


export const App = () => {
  const initialOctaveShift = 0;
  const [notesGridOctaveShift, setNotesGridOctaveShift] = useState(initialOctaveShift);
  const updateNotesGridOctaveShift = (newNotesGridOctaveShift) => {
    midiController.octaveOffset = newNotesGridOctaveShift;
    setNotesGridOctaveShift(newNotesGridOctaveShift);
  }

  // const MidiPlayNote = (e) => {
  //   console.log(e.note.identifier);
  //   midiChannel.playNote(e.note.identifier, {attack : e.velocity});
  // }
  
  // const MidiStopNote = (e) => {
  //   console.log(e.note.identifier);
  //   midiChannel.stopNote(e.note.identifier);
  // }

  // React.useEffect(() => {
    // midiController.addListener("noteon", MidiPlayNote);
    // midiController.addListener("noteoff", MidiStopNote);
    
    // return () => {
      // midiController.removeListener("noteon", MidiPlayNote);
      // midiController.removeListener("noteoff", MidiStopNote);
    // }
  // }, [notesGridOctaveShift])


  return (
    <>
      <SetNotesGridOctaveShift 
        updateNotesGridOctaveShift={updateNotesGridOctaveShift}
      />
      
      <PitchBendSlider />
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
