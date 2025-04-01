import { useEffect, useState } from "react";
import { Timer } from "../../../features/timers/timerDTO";
import { extractRemainingTime } from "../../../utils/functions/extractRemainingTime";

function TimerItemCountdownContent({
  item,
  pauseStatus,
}: {
  item: Timer;
  pauseStatus: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState(() => extractRemainingTime(item));

  useEffect(() => {
    let timer: number;
    if (!pauseStatus) {
      timer = setInterval(() => {
        const remaining = extractRemainingTime(item);
        setTimeLeft(remaining);
        if (
          remaining.hours === 0 &&
          remaining.minutes === 0 &&
          remaining.seconds === 0
        ) {
          clearInterval(timer);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [pauseStatus]);

  return (
    <>
      <span className="text-5xl text-black md:gap-2 md:text-7xl lg:text-9xl dark:text-white">
        {String(timeLeft.hours).padStart(2, "0")}
        <span className="text-xs text-black dark:text-white">hrs</span>
      </span>
      <span className="text-5xl text-black md:gap-2 md:text-7xl lg:text-9xl dark:text-white">
        {String(timeLeft.minutes).padStart(2, "0")}
        <span className="text-xs text-black dark:text-white">min</span>
      </span>
      <span className="text-5xl text-black md:gap-2 md:text-7xl lg:text-9xl dark:text-white">
        {String(timeLeft.seconds).padStart(2, "0")}
        <span className="text-xs text-black dark:text-white">s</span>
      </span>
    </>
  );
}

export default TimerItemCountdownContent;
