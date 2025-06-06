import { useEffect } from "react";
import {
  TimeDuration,
  TimeDurationDTO,
  Timer,
} from "../../../features/timers/timerDTO";
import { extractRemainingTime } from "../../../utils/functions/extractRemainingTime";
import { extractIsExpiring } from "../../../utils/functions/extractIsExpiring";
import { useAppDispatch } from "../../../app/hooks";
import { setReferenceTime } from "../../../features/timers/timersSlice";

function TimerItemCountdownContent({
  item,
  timeLeft,
  setTimeLeft,
  expiredStatus,
  setExpiredStatus,
  updateItem,
  pauseStatus,
}: {
  item: Timer;
  timeLeft: TimeDuration;
  setTimeLeft: React.Dispatch<React.SetStateAction<TimeDuration>>;
  expiredStatus: boolean;
  setExpiredStatus: React.Dispatch<React.SetStateAction<boolean>>;
  updateItem: React.Dispatch<React.SetStateAction<boolean>>;
  pauseStatus: boolean;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let intervalId: number;
    if (!pauseStatus && !expiredStatus) {
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
          if (!expiredStatus) {
            setExpiredStatus(true);
          }
        }
      }, 1000);
    } else if (pauseStatus && !expiredStatus) {
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
  }, [pauseStatus, expiredStatus]);

  return (
    <>
      <span
        className={`text-3xl ${extractIsExpiring(timeLeft) ? "text-red-500" : "text-black dark:text-white"} transition duration-300 ease-in-out md:gap-2 md:text-5xl lg:text-7xl`}
      >
        {String(timeLeft.hours).padStart(2, "0")}
        <span className="text-xs text-black dark:text-white">hrs</span>
      </span>
      <span
        className={`text-3xl ${extractIsExpiring(timeLeft) ? "text-red-500" : "text-black dark:text-white"} transition duration-300 ease-in-out md:gap-2 md:text-5xl lg:text-7xl`}
      >
        {String(timeLeft.minutes).padStart(2, "0")}
        <span className="text-xs text-black dark:text-white">min</span>
      </span>
      <span
        className={`text-3xl ${extractIsExpiring(timeLeft) ? "text-red-500" : "text-black dark:text-white"} transition duration-300 ease-in-out md:gap-2 md:text-5xl lg:text-7xl`}
      >
        {String(timeLeft.seconds).padStart(2, "0")}
        <span className="text-xs text-black dark:text-white">s</span>
      </span>
    </>
  );
}

export default TimerItemCountdownContent;
