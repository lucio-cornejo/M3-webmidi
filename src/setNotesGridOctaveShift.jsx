import React from "react";
import { notesGridOctaveShiftContext } from "./App";


export const SetNotesGridOctaveShift = () => {
  const { updateNotesGridOctaveShift } = React.useContext(notesGridOctaveShiftContext);

  const setNotesGridOctaveShift = (event) => {
    if (event.repeat) return;
    if (event.key.match(/\d+/)) updateNotesGridOctaveShift(parseInt(event.key));
  }

  React.useEffect(() => {
    document.addEventListener("keydown", setNotesGridOctaveShift);
    return () => {
      document.removeEventListener("keydown", setNotesGridOctaveShift);
    }
  })
}
