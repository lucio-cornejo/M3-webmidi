import midiControls from './../connect-browser-to-DAW'
const { midiController, midiChannel } = midiControls;

const Grid = ( {
  numRows = 8, numCols = 8, rightShift = 1, downShift = 4
} ) => {
  const rows = [...Array(numCols).keys()]
    .map(cell => <p key={cell}>cell</p>);

  return (
    <>
      <div className="notes-grid-layout">
        {rows}
      </div>
    </>
  )  

}

// midiChannel;
//   .sendPitchBend(-0.5)
//   .sendPitchBend(0.5, {time:'+200ms'})

export default Grid