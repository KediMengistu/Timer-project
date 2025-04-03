import { useEffect, useState } from "react";
import {
  TimeDuration,
  TimeDurationDTO,
  Timer,
} from "../../../features/timers/timerDTO";
import { extractRemainingTime } from "../../../utils/functions/extractRemainingTime";
import { useAppDispatch } from "../../../app/hooks";
import { setReferenceTime } from "../../../features/timers/timersSlice";

function TimerItemCountdownContent({
  item,
  updateItem,
  pauseStatus,
}: {
  item: Timer;
  updateItem: React.Dispatch<React.SetStateAction<boolean>>;
  pauseStatus: boolean;
}) {
  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState<TimeDuration>(() =>
    extractRemainingTime(item),
  );

  useEffect(() => {
    let intervalId: number;
    if (!pauseStatus) {
      if (item.referenceTime) {
        const timeDurationDTO: TimeDurationDTO = {
          id: item.id,
          timeDuration: null,
        };
        dispatch(setReferenceTime(timeDurationDTO));
        updateItem(true);
      }
      setTimeLeft(extractRemainingTime(item));
      intervalId = setInterval(() => {
        const remaining = extractRemainingTime(item);
        setTimeLeft(remaining);
        if (
          remaining.hours === 0 &&
          remaining.minutes === 0 &&
          remaining.seconds === 0
        ) {
          clearInterval(intervalId);
        }
      }, 1000);
    } else {
      if (!item.referenceTime) {
        const timeDurationDTO: TimeDurationDTO = {
          id: item.id,
          timeDuration: timeLeft,
        };
        dispatch(setReferenceTime(timeDurationDTO));
        updateItem(true);
      } else {
        setTimeLeft(item.referenceTime);
      }
    }
    return () => clearInterval(intervalId);
  }, [pauseStatus]);

  return (
    <>
      <span className="text-3xl text-black md:gap-2 md:text-5xl lg:text-7xl dark:text-white">
        {String(timeLeft.hours).padStart(2, "0")}
        <span className="text-xs text-black dark:text-white">hrs</span>
      </span>
      <span className="text-3xl text-black md:gap-2 md:text-5xl lg:text-7xl dark:text-white">
        {String(timeLeft.minutes).padStart(2, "0")}
        <span className="text-xs text-black dark:text-white">min</span>
      </span>
      <span className="text-3xl text-black md:gap-2 md:text-5xl lg:text-7xl dark:text-white">
        {String(timeLeft.seconds).padStart(2, "0")}
        <span className="text-xs text-black dark:text-white">s</span>
      </span>
    </>
  );
}

export default TimerItemCountdownContent;
