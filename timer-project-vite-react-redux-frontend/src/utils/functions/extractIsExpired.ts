import { TimeDuration } from "../../features/timers/timerDTO";

export const extractIsExpired = (timeLeft: TimeDuration): boolean => {
  return (
    timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0
  );
};
