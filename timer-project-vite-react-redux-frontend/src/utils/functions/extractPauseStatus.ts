import { Timer } from "../../features/timers/timerDTO";

export function extractPauseStatus(timer: Timer): boolean {
  if (!timer) {
    return false;
  } else if (timer.pauseTime === null) {
    return false;
  } else {
    return true;
  }
}
