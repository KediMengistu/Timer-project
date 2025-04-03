import { AnimatePresence, motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Timer } from "../../../features/timers/timerDTO";
import { extractPauseStatus } from "../../../utils/functions/extractPauseStatus";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  pauseTimer,
  playTimer,
  resetTimersError,
  resetTimersStatus,
} from "../../../features/timers/timersSlice";
import TimerItemCountdownContent from "./TimerItemCountdownContent";
import TimerItemStatsContent from "./TimerItemStatsContent";

function TimerItemComponent() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const timerId = id as string;
  const dispatch = useAppDispatch();
  const timersState = useAppSelector((state) => state.timers);
  const [timer, setTimer] = useState<Timer>(
    () => timersState.entities[timerId],
  );
  const [pauseStatus, setPauseStatus] = useState<boolean>(() =>
    extractPauseStatus(timer),
  );
  const [countdownUpdate, setCountdownUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (timersState.status === "succeeded") {
      const updatedTimer = timersState.entities[timerId];
      if (updatedTimer) {
        setTimer(updatedTimer);
        setPauseStatus(extractPauseStatus(updatedTimer));
      }
    }
    dispatch(resetTimersStatus());
    dispatch(resetTimersError());
  }, [timersState]);

  useEffect(() => {
    if (countdownUpdate) {
      const updatedTimer = timersState.entities[timerId];
      setTimer(updatedTimer);
      setCountdownUpdate(false);
    }
  }, [countdownUpdate]);

  useEffect(() => {
    return () => {
      dispatch(resetTimersStatus());
      dispatch(resetTimersError());
    };
  }, []);

  const handleGoBack = () => {
    dispatch(resetTimersStatus());
    dispatch(resetTimersError());
    navigate("/manage-timers");
  };

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
        className="grid grid-cols-none grid-rows-2 border-t-2 border-b-2 border-black bg-white md:grid-cols-2 md:grid-rows-none dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="h-full w-full p-2! pr-2! pb-1! md:pr-1! md:pb-2!">
          <div className="relative grid h-full w-full grid-cols-[60%_40%] grid-rows-none rounded-xl border-1 border-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:grid-cols-none md:grid-rows-[70%_30%] md:flex-row dark:border-gray-700 dark:bg-gray-800">
            <div className="absolute top-1 left-1 flex h-8 w-16 items-center justify-center rounded-xl hover:cursor-pointer">
              <span
                onClick={() => {
                  handleGoBack();
                }}
                className="group text-center text-xs text-black transition duration-300 ease-in-out hover:text-red-500 dark:text-white"
              >
                &larr;
                <span className="text-center text-xs text-black italic underline underline-offset-2 transition duration-300 ease-in-out group-hover:text-red-500 dark:text-white">
                  {" "}
                  Go Back
                </span>
              </span>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <div className="flex flex-1 flex-col items-start justify-center md:flex-row md:items-center md:gap-2">
                <TimerItemCountdownContent
                  item={timer}
                  updateItem={setCountdownUpdate}
                  pauseStatus={pauseStatus}
                />
              </div>
            </div>
            <div className="grid grid-cols-none grid-rows-1 border-t-0 border-black md:mr-3! md:ml-3! md:grid-cols-1 md:grid-rows-none md:border-t-1 dark:border-gray-700">
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
                    className="flex flex-col items-start justify-center md:flex-row md:items-center"
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
                    className="flex flex-col items-start justify-center md:flex-row md:items-center"
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
        <div className="h-full w-full p-2! pt-1! pl-2! md:pt-2! md:pl-1!">
          <div className="h-full w-full rounded-xl border-1 border-black bg-white pt-3! pb-3! shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-gray-700 dark:bg-gray-800">
            <div className="scrollbar-none flex h-full w-full snap-x snap-mandatory scroll-p-1! items-center overflow-x-auto border-t-1 border-b-1 border-black bg-white p-1! pt-1! pr-1! pb-1! pl-1! whitespace-nowrap dark:border-gray-700 dark:bg-gray-800">
              <TimerItemStatsContent item={timer} />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TimerItemComponent;
