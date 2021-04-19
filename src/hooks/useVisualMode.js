import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (mode, replace = false) => {
		setHistory(history => {
			setMode(mode);
			if (replace === true) {
				const newHistory = [...history.slice(0, -1), mode];
				return newHistory;
			} else {
				return [...history, mode];
			}
		});
	};
  function back() {
    console.log("history",history, initial)
    if (history.length >= 2) {
      history.pop();
      return setMode(history[history.length - 1]);
    } else {
      return history[initial];
    }
  }
  return { mode, transition, back };
}
