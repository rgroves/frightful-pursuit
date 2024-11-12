import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AUTO_START_COUNTDOWN_SECONDS } from "../global-constants";

interface AutoStartCountdownProps {
  shouldCountdown: boolean;
}

export default function AutoStartCountdown({
  shouldCountdown,
}: AutoStartCountdownProps) {
  const [seconds, setSeconds] = useState(AUTO_START_COUNTDOWN_SECONDS);
  const [shouldAutoStart, setShouldAutoStart] = useState(false);

  useEffect(() => {
    if (shouldCountdown) {
      let curSeconds = 0;
      const interval = setInterval(() => {
        setSeconds((prev) => {
          return (curSeconds = prev - 1);
        });
        if (curSeconds === 1) {
          setShouldAutoStart(true);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [shouldCountdown]);

  if (shouldAutoStart) {
    return <Navigate to="/game" />;
  }

  return shouldCountdown ? <p>Auto-starting game in {seconds}.</p> : <></>;
}
