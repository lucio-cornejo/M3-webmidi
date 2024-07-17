const orderedPitchClasses = [
  'C', 'Db', 'D', 'Eb', 
  'E', 'F', 'Gb', 'G', 
  'Ab', 'A','Bb', 'B'
];


// Perform modulo operation in JavaScript
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
function modulo(number, divisor) {
  return ((number % divisor) + divisor) % divisor;
}


function shiftNoteAsText(noteText, noteShift) {
  const [pitchClass, octave] = noteText.match(/([A-G])(\d+)/).slice(1, 3);

  const shiftedPitchClass = orderedPitchClasses[
    modulo(noteShift + orderedPitchClasses.indexOf(pitchClass), 12)
  ];
  const shiftedOctave = (parseInt(octave) + (noteShift - modulo(noteShift, 12))/12).toString();

  return `${shiftedPitchClass}${shiftedOctave}`;
}


function Note({baseNote, noteShift}) {
  return (
    <>
      <div className="note">{shiftNoteAsText(baseNote, noteShift)}</div>
    </>
  )
}

export default Note;
