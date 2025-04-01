import { Timer } from "../../features/timers/timerDTO";

export function extractRemainingTime(timer: Timer) {
  if (!timer || !timer.endTime) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  // Get effective end time (original or delayed)
  const effectiveEndTime = timer.delayedEndTime
    ? new Date(timer.delayedEndTime).getTime()
    : new Date(timer.endTime).getTime();

  // If timer is paused, use pauseTime as reference
  // Otherwise use current time
  const referenceTime = timer.pauseTime
    ? new Date(timer.pauseTime).getTime()
    : new Date().getTime();

  const difference = Math.max(0, effectiveEndTime - referenceTime);

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}
