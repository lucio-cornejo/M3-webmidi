import { useEffect } from "react";


export default function SetNotesGridOctaveShift ({
  updateNotesGridOctaveShift
}) {
  const setNotesGridOctaveShift = (event) => {
    if (event.repeat) return;
    if (event.key.match(/\d+/)) updateNotesGridOctaveShift(parseInt(event.key));

    console.log(1)
  }

  useEffect(() => {
    document.addEventListener("keydown", setNotesGridOctaveShift);
    return () => {
      document.removeEventListener("keydown", setNotesGridOctaveShift);
    }
  }, [])

  return null;
}
