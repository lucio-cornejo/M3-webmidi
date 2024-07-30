import { useState, useRef, useEffect } from 'react';

import { roundToNumberOfDecimals } from './../utils/numberTransformers';
import midiControls from '../connectBrowserToDaw'


const { midiController } = midiControls;

// Map afterTouch values (0 to 1) into
// an appropiate (this is subjective to the person playing)
// value for pitchBend (-1 to 1)
const vibratoScalerForPitchBend = 0.75;

const minAfterChangeValue = 0;
const maxAfterChangeValue = 1;
const middleValueForAfterChange = 0.5*(minAfterChangeValue + maxAfterChangeValue);

export default function VibratoToggler ({
  pitchBendValue, pitchBendChangeHandler
}) {
  const [isVibratoOn, setIsVibratoOn] = useState(false);
  const afterTouchValue = useRef(null);
  const vibratoOriginValue = useRef(null);

  const resetVibrato = () => {
    if (!isVibratoOn) return;
    setIsVibratoOn(false);

    pitchBendChangeHandler( { target: { value : 0 } } );
    vibratoOriginValue.current = null;
  };

  const channelaftertouchHandler = (event) => {
    afterTouchValue.current = event.value;
    
    if (!isVibratoOn) return;

    let standarizedVibratoMultiplier;
    if (vibratoOriginValue.current < middleValueForAfterChange) {
      if (afterTouchValue.current < vibratoOriginValue.current) {
        // Avoid vibrato cause by movement when pressed pad/key is released
        return;
      }
      standarizedVibratoMultiplier = 1 / (maxAfterChangeValue - vibratoOriginValue.current);
    } else {
      if (afterTouchValue.current > vibratoOriginValue.current) {
        // Avoid vibrato cause by movement when pressed pad/key is released
        return;
      }
      standarizedVibratoMultiplier = 1 / (vibratoOriginValue.current - minAfterChangeValue);
    }
    
    const afterTouchValueChange = standarizedVibratoMultiplier * Math.abs(
      afterTouchValue.current - vibratoOriginValue.current
    );

    pitchBendChangeHandler({ 
      target: { 
        value : vibratoScalerForPitchBend * roundToNumberOfDecimals(afterTouchValueChange, 3)
        } 
    });
  }


  useEffect(() => {
    midiController.addListener("channelaftertouch", channelaftertouchHandler);
    midiController.addListener("noteoff", resetVibrato);
    return () => {
      midiController.removeListener("channelaftertouch", channelaftertouchHandler);
      midiController.removeListener("noteoff", resetVibrato);
    }
  }, [isVibratoOn, pitchBendValue])


  return (
    <div style={{ 
      paddingTop: '10px',
      textAlign: 'center',
    }}>
      <button
        style={{ 
          padding: '15px 10px',
          width: 'fit-content',
          border: '1px dashed black',
          color: isVibratoOn ? 'green' : 'crimson',
        }}
        onLoad={(e) => console.log(e)}
        onClick={(e) => {
          if (!isVibratoOn) {
            vibratoOriginValue.current = afterTouchValue.current;
          } else {
            // Allow for user to disable vibrato by turning it
            // off prior to releasing the pad/key pressed right
            // befor activating vibrato .
            pitchBendChangeHandler( { target: { value : 0 } } );
          }
          setIsVibratoOn(value => !value);
        }}
      >
        {'Toggle vibrato'}
      </button>
    </div>
  )
}
