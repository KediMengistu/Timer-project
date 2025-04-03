import { TimeDuration } from "../../features/timers/timerDTO";

export function extractPausedDuration(milliseconds: number): TimeDuration {
  const ms = Math.max(0, milliseconds);
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours,
    minutes,
    seconds,
  };
}
