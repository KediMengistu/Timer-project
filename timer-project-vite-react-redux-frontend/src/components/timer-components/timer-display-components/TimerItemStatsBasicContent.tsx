import { Timer } from "../../../features/timers/timerDTO";
import { extractAmPm } from "../../../utils/functions/extractAMPM";
import { extractDate } from "../../../utils/functions/extractDate";
import { extractLocalTime } from "../../../utils/functions/extractLocalTime";
import { extractPausedDuration } from "../../../utils/functions/extractPausedDuration";

function TimerItemStatsBasicContent({ item }: { item: Timer }) {
  // Convert pausedDurationInMs to a TimeDuration object
  const pausedDuration = extractPausedDuration(item.pausedDurationInMs);

  return (
    <div className="relative ml-2! inline-grid h-full w-full shrink-0 grow-0 snap-center snap-always grid-rows-9 rounded-sm border-1 border-black bg-white align-middle whitespace-normal dark:border-gray-700 dark:bg-gray-800">
      <div className="gap flex items-center rounded-tl-sm rounded-tr-sm bg-white">
        <span className="md:text-md text-xs text-black dark:text-white">
          Start date
        </span>
        <span className="md:text-md text-xs text-black dark:text-white">
          {extractDate(item.startTime)}
        </span>
      </div>
      <div className="bg-gray-300">
        <span className="md:text-md text-xs text-black dark:text-white">
          {extractLocalTime(item.startTime)} {extractAmPm(item.startTime)}
        </span>
      </div>
      <div className="bg-white">
        <span className="md:text-md text-xs text-black dark:text-white">
          {String(item.durationHours).padStart(2, "0")} hrs
        </span>
      </div>
      <div className="bg-gray-300">
        <span className="md:text-md text-xs text-black dark:text-white">
          {String(item.durationMinutes).padStart(2, "0")} min
        </span>
      </div>
      <div className="bg-white">
        <span className="md:text-md text-xs text-black dark:text-white">
          {String(item.durationSeconds).padStart(2, "0")} s
        </span>
      </div>
      <div className="bg-gray-300">
        <span className="md:text-md text-xs text-black dark:text-white">
          {item.breakDuration} min
        </span>
      </div>
      <div className="bg-white">
        <span className="md:text-md text-xs text-black dark:text-white">
          {item.numberOfBreaks} breaks
        </span>
      </div>
      <div className="bg-gray-300">
        <span className="md:text-md text-xs text-black dark:text-white">
          {String(pausedDuration.hours).padStart(2, "0")}h{" "}
          {String(pausedDuration.minutes).padStart(2, "0")}m{" "}
          {String(pausedDuration.seconds).padStart(2, "0")}s
        </span>
      </div>
      <div className="rounded-br-sm rounded-bl-sm bg-white">
        <span className="md:text-md text-xs text-black dark:text-white">
          {!item.delayedEndTime
            ? `${extractLocalTime(item.endTime)} ${extractAmPm(item.endTime)}`
            : `${extractLocalTime(item.delayedEndTime)} ${extractAmPm(item.delayedEndTime)}`}
        </span>
      </div>
    </div>
  );
}

export default TimerItemStatsBasicContent;
