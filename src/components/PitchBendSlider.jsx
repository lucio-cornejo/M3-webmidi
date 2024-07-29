import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import midiControls from './../connect-browser-to-DAW'


const { midiChannel } = midiControls;

const marks = [
  { value: 1,    label: '+2' },
  { value: 0.5,  label: '+1' },
  { value: 0,    label: '0'  },
  { value: -0.5, label: '-1' },
  { value: -1,   label: '-2' }
];

const PitchBendSlider = () => {
  const defaultPitchBendValue = 0;
  const [pitchBendValue, setPitchBendValue] = useState(defaultPitchBendValue);

  // Source: https://stackoverflow.com/a/11832950
  const roundToTwoDecimals = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
  const changeHandler = (event) => {
    midiChannel.sendPitchBend(event.target.value);
    setPitchBendValue(event.target.value);
  };
  
  const resetSliderToNeutralValue = async (event) => {
    const numSteps = 10;
    const changePerStep = (defaultPitchBendValue - pitchBendValue) / numSteps;
    for (let _ of Array(numSteps)) {
      setPitchBendValue(previous => roundToTwoDecimals(previous + changePerStep));
      await new Promise(r => setTimeout(r, 10));
    };

    setPitchBendValue(defaultPitchBendValue);
    midiChannel.sendPitchBend(defaultPitchBendValue);
  };


  return (
    <Box 
      sx={{ width: 300 }}
      style={{ padding: '40px 0 30px 0', }}
    >
      <Slider
        size={'medium'}
        value={pitchBendValue}
        valueLabelFormat={(value) => `${value > 0 ? '+' : ''}${2 * value}`}
        step={0.01}
        min={-1}
        max={1}
        marks={marks}
        valueLabelDisplay="on"
        onChange={(e) => changeHandler(e)}
        onChangeCommitted={(e) => resetSliderToNeutralValue(e)}
      />
    </Box>
  );
}

export default PitchBendSlider;
