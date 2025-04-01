import { AnimatePresence, motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Timer } from "../../../features/timers/timerDTO";
import { extractPauseStatus } from "../../../utils/functions/extractPauseStatus";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import TimerItemCountdownContent from "./TimerItemCountdownContent";
import { pauseTimer, playTimer } from "../../../features/timers/timersSlice";

function TimerItemComponent() {
  const { id } = useParams<{ id: string }>();
  const timerId = id as string;
  const dispatch = useAppDispatch();
  const timersState = useAppSelector((state) => state.timers);
  const [timer, setTimer] = useState<Timer>(timersState.entities[timerId]);
  const [pauseStatus, setPauseStatus] = useState<boolean>(() =>
    extractPauseStatus(timer),
  );

  useEffect(() => {
    if (!timer) {
      setTimer(timersState.entities[timerId]);
    }
  }, []);

  useEffect(() => {
    if (timersState.status === "succeeded") {
      setPauseStatus(!pauseStatus);
    }
  }, [timersState]);

  const handlePause = () => {
    dispatch(pauseTimer(timer.id));
  };

  const handlePlay = () => {
    dispatch(playTimer(timer.id));
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="TimerItemComponent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="grid grid-cols-[70%_30%] grid-rows-none border-t-2 border-b-2 border-black bg-white md:grid-cols-none md:grid-rows-[70%_30%] dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="grid grid-cols-none grid-rows-[70%_30%] border-r-2 border-b-0 border-black md:grid-cols-[70%_30%] md:grid-rows-none md:border-r-0 md:border-b-2 dark:border-gray-700">
          <div className="border-r-0 border-b-2 border-black p-2! md:border-r-2 md:border-b-0 dark:border-gray-700">
            <div className="grid h-full w-full grid-cols-[70%_30%] grid-rows-none rounded-xl border-1 border-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:grid-cols-none md:grid-rows-[70%_30%] md:flex-row dark:border-gray-700">
              <div className="flex flex-col items-center md:flex-row">
                <div className="flex flex-1 flex-col items-start justify-center md:flex-row md:items-center md:gap-2">
                  <TimerItemCountdownContent
                    item={timer}
                    pauseStatus={pauseStatus}
                  />
                </div>
              </div>
              <div className="xs:border-l-0 mt-3! mb-3! grid grid-cols-none grid-rows-1 border-t-0 border-l-1 border-black md:mt-0! md:mr-3! md:mb-0! md:ml-3! md:grid-cols-1 md:grid-rows-none md:border-t-1 md:border-l-0 dark:border-gray-700">
                <AnimatePresence mode="wait" initial={false}>
                  {pauseStatus ? (
                    <motion.div
                      key="TimerItemComponentPlay"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                      }}
                      className="flex flex-col items-center justify-center md:flex-row"
                    >
                      <FaPlay
                        onClick={() => {
                          handlePlay();
                        }}
                        className="h-12 w-12 fill-black transition duration-300 ease-in-out hover:cursor-pointer hover:fill-green-500 md:h-14 md:w-14 dark:fill-white"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="TimerItemComponentPause"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                      }}
                      className="flex flex-col items-center justify-center md:flex-row"
                    >
                      <FaPause
                        onClick={() => {
                          handlePause();
                        }}
                        className="h-12 w-12 fill-black transition duration-300 ease-in-out hover:cursor-pointer hover:fill-red-500 md:h-14 md:w-14 dark:fill-white"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div>
            md: top-right
            <br />
            sm: bottom-left
          </div>
        </div>
        <div className="">
          md: bottom
          <br />
          sm: right
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TimerItemComponent;
