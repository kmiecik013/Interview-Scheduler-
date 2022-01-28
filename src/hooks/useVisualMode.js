import { React, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history.slice(0, history.length - 1)];
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  const transition = (newMode, replace = false) => {
    if (replace) back();
    setHistory((prev) => [...prev, newMode]);
    return setMode(newMode);
  };

  return { mode, transition, back };
};

