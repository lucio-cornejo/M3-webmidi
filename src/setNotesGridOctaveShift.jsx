import React from "react";


export const SetNotesGridOctaveShift = ({
  updateNotesGridOctaveShift
}
) => {
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

  return null;
}
