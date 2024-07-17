import Note from './Note';


function NotesGrid ({
  upperLeftCornerNote,
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
    gridTemplateRows : `repeat(${numRows}, calc(100svh / ${numRows}))`,
    gridTemplateColumns : `repeat(${numCols}, calc(100svw / ${numCols}))`,
  }


  return (
    <>
      <div className="notes-grid" style={notesGridStyle}>
        {
          notesShifts.map(noteShift => (
            <Note baseNote={upperLeftCornerNote} noteShift={noteShift}/>
          ))
        }
      </div>
    </>
  )  

}

// midiChannel;
//   .sendPitchBend(-0.5)
//   .sendPitchBend(0.5, {time:'+200ms'})

export default NotesGrid;
