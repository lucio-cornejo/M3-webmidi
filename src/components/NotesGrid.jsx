import { Note } from './Note';


export const NotesGrid = ({
  baseNote,
  numRows = 8, numCols = 8,
  rightShift = 4, downShift = 1
}) => {
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

  return (
    <>
      <div className="notes-grid" style={notesGridStyle}>
        {
          notesShifts.map(noteShift => (
            <Note baseNote={baseNote} noteShift={noteShift}/>
          ))
        }
      </div>
    </>
  )  

}
