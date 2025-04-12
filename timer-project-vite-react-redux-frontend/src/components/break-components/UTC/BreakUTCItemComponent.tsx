import { Break } from "../../../features/breaks/breakDTO";
import { extractAmPm } from "../../../utils/functions/extractAMPM";
import { extractDate } from "../../../utils/functions/extractDate";
import { extractPausedDuration } from "../../../utils/functions/extractPausedDuration";
import { extractUTCTime } from "../../../utils/functions/extractUTCTime";

function BreakUTCItemComponent({
  item,
  addedTime,
  numberOfBreaks,
}: {
  item: Break;
  addedTime: number;
  numberOfBreaks: number;
}) {
  return (
    <>
      <div className="h-fit w-full">
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between bg-black p-1! dark:bg-gray-700">
          <span className="text-xs text-white">Break Number</span>
          <span className="text-xs text-white">{item.breakNumber}</span>
        </div>
        <div className="flex flex-row items-center justify-between border-b-1 border-black p-1! dark:border-gray-700">
          <span className="text-xs text-black dark:text-white">Start Date</span>
          <span className="text-xs text-red-500 dark:text-yellow-400">
            {extractDate(item.startTime)}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between border-b-1 border-black p-1! dark:border-gray-700">
          <span className="text-xs text-black dark:text-white">Start Time</span>
          <span className="text-xs text-red-500 dark:text-yellow-400">
            {extractUTCTime(item.startTime)} {extractAmPm(item.startTime)}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between border-b-1 border-black p-1! dark:border-gray-700">
          <span className="text-xs text-black dark:text-white">Duration</span>
          <span className="text-xs text-black dark:text-white">
            {String(item.breakDuration).padStart(2, "0")} min
          </span>
        </div>
        <div className="flex flex-row items-center justify-between border-b-1 border-black p-1! dark:border-gray-700">
          <span className="text-xs text-black dark:text-white">End Date</span>
          <span className="text-xs text-red-500 dark:text-yellow-400">
            {extractDate(item.endTime)}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between p-1!">
          <span className="text-xs text-black dark:text-white">End Time</span>
          <span className="text-xs text-red-500 dark:text-yellow-400">
            {extractUTCTime(item.endTime)} {extractAmPm(item.endTime)}
          </span>
        </div>
        {item.breakNumber === numberOfBreaks ? (
          <>
            <div className="flex flex-row items-center p-1!">
              <span className="text-black-500 text-center text-xs dark:text-white">
                Note: Paused duration total of
                <br />
                {String(extractPausedDuration(addedTime).hours).padStart(
                  2,
                  "0",
                )}
                hrs{" "}
                {String(extractPausedDuration(addedTime).minutes).padStart(
                  2,
                  "0",
                )}
                min{" "}
                {String(extractPausedDuration(addedTime).seconds).padStart(
                  2,
                  "0",
                )}
                s not accounted for in break start dates & times and break end
                dates & times.
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default BreakUTCItemComponent;
