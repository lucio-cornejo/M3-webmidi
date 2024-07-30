import { useEffect } from 'react';

import { Note } from './Note';
import midiControls from './../connectBrowserToDaw'


const { midiController, midiChannel } = midiControls;


export default function NotesGrid ({
  notesGridOctaveShift,
  numRows = 8, numCols = 8,
  rightShift = 4, downShift = 1
}) {
  let notesShifts = [];
  const upperRowShifts = [...Array(numCols).keys()].map(e => e*rightShift);

  [...Array(numRows).keys()].forEach((rowIndex) => {
    const notesShiftsRow = upperRowShifts.map(e => e + rowIndex*downShift);
    notesShifts = [...notesShifts, ...notesShiftsRow]
  });

  const notesGridStyle = {
    display : 'grid',
    gridTemplateRows : `repeat(${numRows}, calc(100% / ${numRows}))`,
    gridTemplateColumns : `repeat(${numCols}, calc(100% / ${numCols}))`,
  }

  const MidiPlayNote = (e) => {
    console.log(e.note.identifier);
    midiChannel.playNote(e.note.identifier, {attack : e.velocity});
  };
  const MidiStopNote = (e) => {
    console.log(e.note.identifier);
    midiChannel.stopNote(e.note.identifier);
  };

  useEffect(() => {
    midiController.addListener("noteon", MidiPlayNote);
    midiController.addListener("noteoff", MidiStopNote);
    return () => {
      midiController.removeListener("noteon", MidiPlayNote);
      midiController.removeListener("noteoff", MidiStopNote);
    }
  }, [notesGridOctaveShift])


  return (
    <div className="notes-grid" style={notesGridStyle}>
      {
        notesShifts.map(noteShift => (
          <Note 
            baseNote={`C${2 + notesGridOctaveShift}`} 
            noteShift={noteShift}
          />
        ))
      }
    </div>
  )  
}
