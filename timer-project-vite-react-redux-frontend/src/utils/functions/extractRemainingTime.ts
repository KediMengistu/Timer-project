import { TimeDuration, Timer } from "../../features/timers/timerDTO";

export function extractRemainingTime(timer: Timer): TimeDuration {
  if (!timer || !timer.endTime) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const endTime = timer.delayedEndTime
    ? new Date(timer.delayedEndTime).getTime()
    : new Date(timer.endTime).getTime();

  const now = timer.pauseTime
    ? new Date(timer.pauseTime).getTime()
    : new Date().getTime();

  const difference = Math.max(0, endTime - now);

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}
