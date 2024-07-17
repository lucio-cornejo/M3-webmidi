import React from 'react';
import './App.css'

import { NotesGrid } from './components/NotesGrid';

// import midiControls from './connect-browser-to-DAW'
// const { midiController, midiChannel } = midiControls;


const shiftOctave = (noteString, octaveShift) => {
  const octave = noteString.match(/\d/g)[0];
  const shiftedOctave = noteString
    .replace(/\d/g, (parseInt(octave) + octaveShift).toString());

  return shiftedOctave;
}


// Allow notes grid base note to be modified, to trigger
// re-render of notes grid, via multiple components
// Source: https://medium.com/@christopherthai/why-you-shouldnt-pass-react-s-setstate-as-a-prop-a-deep-dive-8a3dcd74bec8
export const notesGridBaseNoteContext = React.createContext();

export const App = () => {
  /*
  const [count, setCount] = useState(0);

  const MidiPlayNote = (e) => {
    const shiftedOctave = shiftOctave(e.note.identifier, count);
    console.log(
      e.note.identifier, shiftedOctave
    )
  
    midiChannel.playNote(shiftedOctave, {attack : e.velocity});
    // midiChannel.playNote(e.note.identifier, {attack : e.velocity});
  }
  
  const MidiStopNote = (e) => {
    const shiftedOctave = shiftOctave(e.note.identifier, count);
    midiChannel.stopNote(shiftedOctave);
    // midiChannel.stopNote(e.note.identifier);
  }
  
  useEffect(() => {
    midiController.addListener("noteon", MidiPlayNote);
    midiController.addListener("noteoff", MidiStopNote);
    
    return () => {
      midiController.removeListener("noteon", MidiPlayNote);
      midiController.removeListener("noteoff", MidiStopNote);
    }
  }, [count])


  document.addEventListener('keydown', (evt) => {
    if (evt.repeat) return;
    if (evt.key.toLowerCase() === "h")  midiChannel.playNote('E3');
  });
  document.addEventListener('keyup', (evt) => {
    if (evt.repeat) return;
    if (evt.key.toLowerCase() === "h")  midiChannel.stopNote('E3');
  });


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Grid/>
      <div className="card">
        <p>Count is {count}</p>
        <button onClick={() => {
          midiChannel.sendAllNotesOff();
          setCount((count) => count - 1);
        }}>
          Transpose 1 octave down
        </button>
        <button onClick={() => {
          midiChannel.sendAllNotesOff();
          setCount((count) => count + 1);
        }}>
          Transpose 1 octave up
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
  */

  const [notesGridBaseNote, setNotesGridBaseNote] = React.useState('C3');
  const updateNotesGridBaseNote = (newNotesGridBaseNote) => setNotesGridBaseNote(newNotesGridBaseNote);

  return (
    <notesGridBaseNoteContext.Provider 
      value={{ notesGridBaseNote, updateNotesGridBaseNote }}
    > 
      <NotesGrid
        baseNote={notesGridBaseNote}
        numCols={8}
        numRows={8}
        rightShift={4}
        downShift={1}
      />
    </notesGridBaseNoteContext.Provider>
  )
}
