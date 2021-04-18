import react, { useEffect, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(mode, replace = false) {
    setHistory([...history, mode]);
    setMode(mode);
  }
  function back() {
    if (history.length >= 2) {
      history.pop();
      return setMode(history[history.length - 1]);
    } else {
      return history[initial];
    }
  }
  return { mode, transition, back };
}
