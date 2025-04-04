import { AnimatePresence, motion } from "framer-motion";
import { TimeDuration, Timer } from "../../../features/timers/timerDTO";
import { extractAmPm } from "../../../utils/functions/extractAMPM";
import { extractDate } from "../../../utils/functions/extractDate";
import { extractPausedDuration } from "../../../utils/functions/extractPausedDuration";
import { extractUTCTime } from "../../../utils/functions/extractUTCTime";
import { extractLocalTime } from "../../../utils/functions/extractLocalTime";
import { useAppSelector } from "../../../app/hooks";
import BreakComponent from "../../breaks-components/BreakComponent";

function TimerItemInformationContent({
  item,
  timeLeft,
}: {
  item: Timer;
  timeLeft: TimeDuration;
}) {
  const timezoneState = useAppSelector((state) => state.time.timezone);

  return (
    <AnimatePresence mode="wait">
      {timezoneState ? (
        <motion.div
          key="UTCTimerItemInformation"
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          className="absolute top-[50%] left-[50%] grid h-80 w-64 -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] rounded-2xl border-2 border-black bg-white pb-4! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex items-center justify-between p-2! dark:border-b-gray-700">
            <h1 className="text-center text-xs text-black italic dark:text-white">
              {item.title} Stats &#183; UTC TZ
            </h1>
            <h1 className="text-center text-xs text-black italic dark:text-white">
              <span className="font-bold">
                {timeLeft.hours}hrs {timeLeft.minutes}min {timeLeft.seconds}s
              </span>
            </h1>
          </div>
          <div className="scrollbar-none flex h-full w-full snap-x snap-mandatory scroll-p-1! items-center overflow-x-auto border-t-2 border-black pt-1! pr-1! pb-1! pl-1! whitespace-nowrap md:pb-4! dark:border-gray-700 dark:bg-gray-800">
            <div className="ml-2! inline h-full w-full shrink-0 grow-0 snap-center snap-always rounded-sm border-1 border-black bg-white align-middle whitespace-normal shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-gray-700 dark:bg-gray-800">
              <div className="grid h-full w-full grid-rows-10 gap-1 p-1!">
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Start Date</span>
                    <span className="font-bold italic">
                      {extractDate(item.startTime)}
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Start Time</span>
                    <span className="font-bold italic">
                      {extractUTCTime(item.startTime)}{" "}
                      {extractAmPm(item.startTime)}
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Duration Hours</span>
                    <span className="font-bold italic">
                      {String(item.durationHours).padStart(2, "0")} hrs
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Duration Minutes</span>
                    <span className="font-bold italic">
                      {String(item.durationMinutes).padStart(2, "0")} min
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Duration Seconds</span>
                    <span className="font-bold italic">
                      {String(item.durationSeconds).padStart(2, "0")} s
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Break Duration</span>
                    <span className="font-bold italic">
                      {item.breakDuration} min
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Number of Breaks</span>
                    <span className="font-bold italic">
                      {item.numberOfBreaks}
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Total Pause Time</span>
                    <span className="font-bold italic">
                      {extractPausedDuration(item.pausedDurationInMs).hours}
                      hrs{" "}
                      {extractPausedDuration(item.pausedDurationInMs).minutes}
                      min{" "}
                      {extractPausedDuration(item.pausedDurationInMs).seconds}s
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>End Date</span>
                    <span className="font-bold italic">
                      {item.delayedEndTime
                        ? extractDate(item.delayedEndTime)
                        : extractDate(item.endTime)}
                    </span>
                  </h1>
                </div>
                <div className="">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>End Time</span>
                    <span className="font-bold italic">
                      {item.delayedEndTime
                        ? `${extractUTCTime(item.delayedEndTime)} ${extractAmPm(item.delayedEndTime)}`
                        : `${extractUTCTime(item.endTime)}  ${extractAmPm(item.endTime)}`}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
            <BreakComponent />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="LocalTimerItemInformation"
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          className="absolute top-[50%] left-[50%] grid h-80 w-64 -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] rounded-2xl border-2 border-black bg-white pb-4! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex items-center justify-between p-2! dark:border-b-gray-700">
            <h1 className="text-center text-xs text-black italic dark:text-white">
              {item.title} Stats &#183; Local TZ
            </h1>
            <h1 className="text-center text-xs text-black italic dark:text-white">
              <span className="font-bold">
                {timeLeft.hours}hrs {timeLeft.minutes}min {timeLeft.seconds}s
              </span>
            </h1>
          </div>
          <div className="scrollbar-none flex h-full w-full snap-x snap-mandatory scroll-p-1! items-center overflow-x-auto border-t-2 border-black pt-1! pr-1! pb-4! pl-1! whitespace-nowrap dark:border-gray-700 dark:bg-gray-800">
            <div className="relative ml-2! inline h-full w-full shrink-0 grow-0 snap-center snap-always rounded-sm border-1 border-black bg-white align-middle whitespace-normal shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-gray-700 dark:bg-gray-800">
              <div className="grid h-full w-full grid-rows-10 gap-1 p-1!">
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Start Date</span>
                    <span className="font-bold italic">
                      {extractDate(item.startTime)}
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Start Time</span>
                    <span className="font-bold italic">
                      {extractLocalTime(item.startTime)}{" "}
                      {extractAmPm(item.startTime)}
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Duration Hours</span>
                    <span className="font-bold italic">
                      {String(item.durationHours).padStart(2, "0")} hrs
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Duration Minutes</span>
                    <span className="font-bold italic">
                      {String(item.durationMinutes).padStart(2, "0")} min
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Duration Seconds</span>
                    <span className="font-bold italic">
                      {String(item.durationSeconds).padStart(2, "0")} s
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Break Duration</span>
                    <span className="font-bold italic">
                      {item.breakDuration} min
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Number of Breaks</span>
                    <span className="font-bold italic">
                      {item.numberOfBreaks}
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>Total Pause Time</span>
                    <span className="font-bold italic">
                      {extractPausedDuration(item.pausedDurationInMs).hours}
                      hrs{" "}
                      {extractPausedDuration(item.pausedDurationInMs).minutes}
                      min{" "}
                      {extractPausedDuration(item.pausedDurationInMs).seconds}s
                    </span>
                  </h1>
                </div>
                <div className="border-b-1 border-black dark:border-gray-700">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>End Date</span>
                    <span className="font-bold italic">
                      {item.delayedEndTime
                        ? extractDate(item.delayedEndTime)
                        : extractDate(item.endTime)}
                    </span>
                  </h1>
                </div>
                <div className="">
                  <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                    <span>End Time</span>
                    <span className="font-bold italic">
                      {item.delayedEndTime
                        ? `${extractLocalTime(item.delayedEndTime)} ${extractAmPm(item.delayedEndTime)}`
                        : `${extractLocalTime(item.endTime)}  ${extractAmPm(item.endTime)}`}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
            <BreakComponent />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TimerItemInformationContent;
