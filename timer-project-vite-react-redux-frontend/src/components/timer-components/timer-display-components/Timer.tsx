import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Timer } from "../../../features/timers/timerDTO";
import { useAppSelector } from "../../../app/hooks";

function TimerItemComponent() {
  const timersState = useAppSelector((state) => state.timers);
  const { id } = useParams<{ id: string }>();
  const [timer, setTimer] = useState<Timer | null>(null);

  useEffect(() => {
    if (id) {
      setTimer(timersState.entities[id]);
    }
  }, []);

  // Helper function for padding - doesn't rely on truthy/falsy evaluation
  const formatTime = (value: number | undefined) => {
    if (value === undefined || value === null) return "00";
    return value < 10 ? `0${value}` : `${value}`;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="TimerComponent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="grid grid-rows-[70%_30%] border-t-2 border-b-2 border-black bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex flex-row items-center justify-center gap-2 p-1!">
          <span className="text-center text-9xl">
            {formatTime(timer?.durationHours)}
            <span className="text-center text-4xl">hrs</span>
          </span>
          <span className="text-center text-9xl">
            {formatTime(timer?.durationMinutes)}
            <span className="text-center text-4xl">min</span>
          </span>
          <span className="text-center text-9xl">
            {formatTime(timer?.durationSeconds)}
            <span className="text-center text-4xl">s</span>
          </span>
        </div>
        <div className="h-full w-full">
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative h-[50%] w-[75%] border-r-2 border-l-2 border-black dark:border-gray-500">
              <span className="absolute top-[-27.5%] left-0 -translate-x-1/2 -translate-y-1/2 font-bold text-black italic underline underline-offset-2 dark:text-gray-500">
                Start
              </span>
              <hr className="absolute top-[50%] left-[50%] w-full -translate-x-1/2 -translate-y-1/2 border-1 border-black dark:border-gray-500"></hr>
              <span className="absolute top-[-27.5%] right-0 -translate-y-1/2 translate-x-1/2 font-bold text-black italic underline underline-offset-2 dark:text-gray-500">
                End
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TimerItemComponent;
