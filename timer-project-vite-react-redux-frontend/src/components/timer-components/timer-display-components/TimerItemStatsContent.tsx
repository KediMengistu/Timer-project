import { Timer } from "../../../features/timers/timerDTO";
import { extractAmPm } from "../../../utils/functions/extractAMPM";
import { extractDate } from "../../../utils/functions/extractDate";
import { extractLocalTime } from "../../../utils/functions/extractLocalTime";
import { extractPausedDuration } from "../../../utils/functions/extractPausedDuration";
import TimerItemStatsBasicContent from "./TimerItemStatsBasicContent";

function TimerItemStatsContent({ item }: { item: Timer }) {
  return (
    <div className="relative ml-2! inline-grid h-[85%] w-full shrink-0 grow-0 snap-center snap-always grid-rows-[auto_1fr] rounded-sm border-1 border-black bg-white p-1! align-middle whitespace-normal shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:h-full dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-center bg-white p-2! dark:bg-gray-800">
        <h1 className="text-xs text-black italic underline underline-offset-2 md:text-sm dark:text-white">
          {item.title} Basic Stats
        </h1>
      </div>
      <div className="grid grid-cols-5 grid-rows-2 gap-1 p-1! md:grid-cols-2 md:grid-rows-5">
        <div className="bg-amber-200"></div>
        <div className="bg-amber-200"></div>
        <div className="bg-amber-200"></div>
        <div className="bg-amber-200"></div>
        <div className="bg-amber-200"></div>
        <div className="bg-amber-200"></div>
        <div className="bg-amber-200"></div>
        <div className="bg-amber-200"></div>
        <div className="bg-amber-200"></div>
        <div className="bg-amber-200"></div>
      </div>
    </div>
  );
}

export default TimerItemStatsContent;
