import { AnimatePresence, motion } from "framer-motion";
// import { useRef } from "react";
import { TimeDuration, Timer } from "../../../features/timers/timerDTO";
import { extractAmPm } from "../../../utils/functions/extractAMPM";
import { extractDate } from "../../../utils/functions/extractDate";
import { extractPausedDuration } from "../../../utils/functions/extractPausedDuration";
import { extractUTCTime } from "../../../utils/functions/extractUTCTime";
import { extractLocalTime } from "../../../utils/functions/extractLocalTime";
import { useAppSelector } from "../../../app/hooks";
import BreakUTCListComponent from "../../break-components/UTC/BreakUTCListComponent";
import BreakLocalListComponent from "../../break-components/Local/BreakLocalListComponent";

function TimerItemInformationContent({
  item,
  timeLeft,
}: {
  item: Timer;
  timeLeft: TimeDuration;
}) {
  const timezoneState = useAppSelector((state) => state.time.timezone);

  // // Add refs for scroll containers
  // const utcScrollContainerRef = useRef<HTMLDivElement | null>(null);
  // const localScrollContainerRef = useRef<HTMLDivElement | null>(null);

  // // Functions to handle left and right scrolling for UTC view
  // const scrollUtcLeft = () => {
  //   if (!utcScrollContainerRef.current) return;

  //   const container = utcScrollContainerRef.current;
  //   const firstChild = container.children[0] as HTMLElement;
  //   const scrollWidth = firstChild.offsetWidth;

  //   container.scrollBy({
  //     left: -scrollWidth,
  //     behavior: "smooth",
  //   });
  // };

  // const scrollUtcRight = () => {
  //   if (!utcScrollContainerRef.current) return;

  //   const container = utcScrollContainerRef.current;
  //   const firstChild = container.children[0] as HTMLElement;
  //   const scrollWidth = firstChild.offsetWidth;

  //   container.scrollBy({
  //     left: scrollWidth,
  //     behavior: "smooth",
  //   });
  // };

  // // Functions to handle left and right scrolling for Local view
  // const scrollLocalLeft = () => {
  //   if (!localScrollContainerRef.current) return;

  //   const container = localScrollContainerRef.current;
  //   const firstChild = container.children[0] as HTMLElement;
  //   const scrollWidth = firstChild.offsetWidth;

  //   container.scrollBy({
  //     left: -scrollWidth,
  //     behavior: "smooth",
  //   });
  // };

  // const scrollLocalRight = () => {
  //   if (!localScrollContainerRef.current) return;

  //   const container = localScrollContainerRef.current;
  //   const firstChild = container.children[0] as HTMLElement;
  //   const scrollWidth = firstChild.offsetWidth;

  //   container.scrollBy({
  //     left: scrollWidth,
  //     behavior: "smooth",
  //   });
  // };

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
          className="absolute top-[50%] left-[50%] h-80 w-58 -translate-x-1/2 -translate-y-1/2 rounded-tl-2xl rounded-tr-2xl border-2 border-black bg-white pb-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="relative grid h-full w-full grid-rows-[auto_1fr]">
            <div className="flex items-center justify-between p-2! dark:border-b-gray-700">
              <h1 className="text-center text-xs text-black italic dark:text-white">
                Stats &#183;{" "}
                <span className="font-bold text-red-500 underline underline-offset-2 dark:text-yellow-400">
                  UTC
                </span>
              </h1>
              <h1 className="text-center text-xs text-black italic dark:text-white">
                <span className="font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}hrs{" "}
                  {String(timeLeft.minutes).padStart(2, "0")}min{" "}
                  {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </h1>
            </div>
            <div
              // ref={utcScrollContainerRef}
              className="relative flex h-full w-full snap-x snap-mandatory scroll-p-1! items-center overflow-x-auto border-t-2 border-black pt-1! pr-1! pb-2! pl-1! whitespace-nowrap dark:border-gray-700 dark:bg-transparent [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent dark:[&::-webkit-scrollbar-track]:bg-transparent"
            >
              <div className="ml-2! inline h-full w-full shrink-0 grow-0 snap-center snap-always rounded-sm border-1 border-black bg-white align-middle whitespace-normal shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-gray-700 dark:bg-gray-800">
                <div className="grid h-full w-full grid-rows-10 gap-1 p-1!">
                  <div className="border-b-1 border-black dark:border-gray-700">
                    <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                      <span>Start Date</span>
                      <span className="font-bold text-red-500 italic dark:text-yellow-400">
                        {extractDate(item.startTime)}
                      </span>
                    </h1>
                  </div>
                  <div className="border-b-1 border-black dark:border-gray-700">
                    <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                      <span>Start Time</span>
                      <span className="font-bold text-red-500 italic dark:text-yellow-400">
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
                        {String(
                          extractPausedDuration(item.pausedDurationInMs).hours,
                        ).padStart(2, "0")}
                        hrs{" "}
                        {String(
                          extractPausedDuration(item.pausedDurationInMs)
                            .minutes,
                        ).padStart(2, "0")}
                        min{" "}
                        {String(
                          extractPausedDuration(item.pausedDurationInMs)
                            .seconds,
                        ).padStart(2, "0")}
                        s
                      </span>
                    </h1>
                  </div>
                  <div className="border-b-1 border-black dark:border-gray-700">
                    <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                      <span>End Date</span>
                      <span className="font-bold text-red-500 italic dark:text-yellow-400">
                        {item.delayedEndTime
                          ? extractDate(item.delayedEndTime)
                          : extractDate(item.endTime)}
                      </span>
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                      <span>End Time</span>
                      <span className="font-bold text-red-500 italic dark:text-yellow-400">
                        {item.delayedEndTime
                          ? `${extractUTCTime(item.delayedEndTime)} ${extractAmPm(item.delayedEndTime)}`
                          : `${extractUTCTime(item.endTime)}  ${extractAmPm(item.endTime)}`}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
              <BreakUTCListComponent item={item} />
            </div>
            {/* <button
              onClick={scrollUtcLeft}
              className="absolute bottom-[-7%] left-[45.5%] flex h-4 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-evenly hover:cursor-pointer active:opacity-55 md:bottom-[-5%]"
            >
              <span className="text-xl text-black dark:text-gray-500">
                &larr;
              </span>
            </button>
            <button
              onClick={scrollUtcRight}
              className="absolute right-[45.5%] bottom-[-7%] flex h-4 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-evenly hover:cursor-pointer active:opacity-55 md:bottom-[-5%]"
            >
              <span className="text-xl text-black dark:text-gray-500">
                &rarr;
              </span>
            </button> */}
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
          className="absolute top-[50%] left-[50%] h-80 w-58 -translate-x-1/2 -translate-y-1/2 rounded-tl-2xl rounded-tr-2xl border-2 border-black bg-white pb-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="relative grid h-full w-full grid-rows-[auto_1fr]">
            <div className="flex items-center justify-between p-2! dark:border-b-gray-700">
              <h1 className="text-center text-xs text-black italic dark:text-white">
                Stats &#183;{" "}
                <span className="font-bold text-red-500 underline underline-offset-2 dark:text-yellow-400">
                  Local
                </span>
              </h1>
              <h1 className="text-center text-xs text-black italic dark:text-white">
                <span className="font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}hrs{" "}
                  {String(timeLeft.minutes).padStart(2, "0")}min{" "}
                  {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </h1>
            </div>
            <div
              // ref={localScrollContainerRef}
              className="relative flex h-full w-full snap-x snap-mandatory scroll-p-1! items-center overflow-x-auto border-t-2 border-black pt-1! pr-1! pb-2! pl-1! whitespace-nowrap dark:border-gray-700 dark:bg-transparent [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent dark:[&::-webkit-scrollbar-track]:bg-transparent"
            >
              <div className="ml-2! inline h-full w-full shrink-0 grow-0 snap-center snap-always rounded-sm border-1 border-black bg-white align-middle whitespace-normal shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-gray-700 dark:bg-gray-800">
                <div className="grid h-full w-full grid-rows-10 gap-1 p-1!">
                  <div className="border-b-1 border-black dark:border-gray-700">
                    <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                      <span>Start Date</span>
                      <span className="font-bold text-red-500 italic dark:text-yellow-400">
                        {extractDate(item.startTime)}
                      </span>
                    </h1>
                  </div>
                  <div className="border-b-1 border-black dark:border-gray-700">
                    <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                      <span>Start Time</span>
                      <span className="font-bold text-red-500 italic dark:text-yellow-400">
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
                        {String(
                          extractPausedDuration(item.pausedDurationInMs).hours,
                        ).padStart(2, "0")}
                        hrs{" "}
                        {String(
                          extractPausedDuration(item.pausedDurationInMs)
                            .minutes,
                        ).padStart(2, "0")}
                        min{" "}
                        {String(
                          extractPausedDuration(item.pausedDurationInMs)
                            .seconds,
                        ).padStart(2, "0")}
                        s
                      </span>
                    </h1>
                  </div>
                  <div className="border-b-1 border-black dark:border-gray-700">
                    <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                      <span>End Date</span>
                      <span className="font-bold text-red-500 italic dark:text-yellow-400">
                        {item.delayedEndTime
                          ? extractDate(item.delayedEndTime)
                          : extractDate(item.endTime)}
                      </span>
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                      <span>End Time</span>
                      <span className="font-bold text-red-500 italic dark:text-yellow-400">
                        {item.delayedEndTime
                          ? `${extractLocalTime(item.delayedEndTime)} ${extractAmPm(item.delayedEndTime)}`
                          : `${extractLocalTime(item.endTime)}  ${extractAmPm(item.endTime)}`}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
              <BreakLocalListComponent item={item} />
            </div>
            {/* <button
              onClick={scrollLocalLeft}
              className="absolute bottom-[-7%] left-[45.5%] flex h-4 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-evenly hover:cursor-pointer active:opacity-55 md:bottom-[-5%]"
            >
              <span className="text-xl text-black dark:text-gray-500">
                &larr;
              </span>
            </button>
            <button
              onClick={scrollLocalRight}
              className="absolute right-[45.5%] bottom-[-7%] flex h-4 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-evenly hover:cursor-pointer active:opacity-55 md:bottom-[-5%]"
            >
              <span className="text-xl text-black dark:text-gray-500">
                &rarr;
              </span>
            </button> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TimerItemInformationContent;
