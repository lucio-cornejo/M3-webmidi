import { useState } from 'react';
import './App.css'

import SetNotesGridOctaveShift from './setNotesGridOctaveShift';
import PitchBendSlider from './components/PitchBendSlider';
import NotesGrid from './components/NotesGrid';

import midiControls from './connectBrowserToDaw'
const { midiController } = midiControls;


export const App = () => {
  const initialOctaveShift = 0;
  const [notesGridOctaveShift, setNotesGridOctaveShift] = useState(initialOctaveShift);
  
  const updateNotesGridOctaveShift = (newNotesGridOctaveShift) => {
    midiController.octaveOffset = newNotesGridOctaveShift;
    setNotesGridOctaveShift(newNotesGridOctaveShift);
  }


  return (
    <>
      <SetNotesGridOctaveShift 
        updateNotesGridOctaveShift={updateNotesGridOctaveShift}
      />
      <PitchBendSlider />
      <NotesGrid
        notesGridOctaveShift={notesGridOctaveShift}
        numCols={8}
        numRows={8}
        rightShift={4}
        downShift={1}
      />
  </>
  )
}
