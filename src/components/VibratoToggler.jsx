import { useRef, useEffect } from 'react';

import midiControls from './../connect-browser-to-DAW'

const { midiController } = midiControls;


const VibratoToggler = ({
  pitchBendValue, pitchBendChangeHandler
}) => {
  const isVibratoOn = useRef(false);
  const channelaftertouchHandler = (event) => {
    if (!isVibratoOn.current) return;

    const semitonesUpShift = event.value * 0.9;
    pitchBendChangeHandler( { target: { value : semitonesUpShift } } );
  }


  useEffect(() => {
    midiController.addListener("channelaftertouch", channelaftertouchHandler);
    return () => {
      midiController.removeListener("channelaftertouch", channelaftertouchHandler);
    }
  }, [pitchBendValue])


  return (
    <div style={{ textAlign: 'center', }}>
      <button
        style={{ padding: '40px 0 30px 0', }}
        onClick={(e) => {
          isVibratoOn.current = !isVibratoOn.current;
        }}
      >
        {'Toggle vibrato'}
      </button>
    </div>
  )
}

export default VibratoToggler;
