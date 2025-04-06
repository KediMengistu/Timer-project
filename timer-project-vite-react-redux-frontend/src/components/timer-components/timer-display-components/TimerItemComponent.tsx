import { AnimatePresence, motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa6";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TimeDuration, Timer } from "../../../features/timers/timerDTO";
import { extractPauseStatus } from "../../../utils/functions/extractPauseStatus";
import { extractRemainingTime } from "../../../utils/functions/extractRemainingTime";
import { extractIsExpired } from "../../../utils/functions/extractIsExpired";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  pauseTimer,
  playTimer,
  resetTimersError,
  resetTimersStatus,
  restartTimer,
} from "../../../features/timers/timersSlice";
import TimerItemCountdownContent from "./TimerItemCountdownContent";
import TimerItemInformationContent from "./TimerItemInformationContent";
import {
  resetBreaksError,
  resetBreaksStatus,
  retrieveAllBreaks,
} from "../../../features/breaks/breaksSlice";

function TimerItemComponent() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const timerId = id as string;
  const dispatch = useAppDispatch();
  const timersState = useAppSelector((state) => state.timers);
  const breaksState = useAppSelector((state) => state.breaks);
  const [timer, setTimer] = useState<Timer>(
    () => timersState.entities[timerId],
  );
  const [timeLeft, setTimeLeft] = useState<TimeDuration>(() =>
    extractRemainingTime(timer),
  );
  const [pauseStatus, setPauseStatus] = useState<boolean>(() =>
    extractPauseStatus(timer),
  );
  const [expiredStatus, setExpiredStatus] = useState<boolean>(() =>
    extractIsExpired(timeLeft),
  );
  const [countdownUpdate, setCountdownUpdate] = useState<boolean>(false);
  const [renderTimerInfo, setRenderTimerInfo] = useState<boolean>(false);

  useEffect(() => {
    if (breaksState.ids.includes(timerId) === false) {
      dispatch(retrieveAllBreaks(timerId)).then(() => {
        dispatch(resetBreaksStatus());
        dispatch(resetBreaksError());
      });
    }
  }, []);

  useEffect(() => {
    if (timersState.status === "succeeded") {
      //update the breaks upon restart
      if (breaksState.ids.includes(timerId) === false) {
        dispatch(retrieveAllBreaks(timerId)).then(() => {
          dispatch(resetBreaksStatus());
          dispatch(resetBreaksError());
        });
      }
      const updatedTimer = timersState.entities[timerId];
      if (updatedTimer) {
        setTimer(updatedTimer);
        if (setExpiredStatus) {
          setExpiredStatus(false);
        }
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
      dispatch(resetBreaksStatus());
      dispatch(resetBreaksError());
    };
  }, []);

  const handleGoBack = () => {
    dispatch(resetTimersStatus());
    dispatch(resetTimersError());
    dispatch(resetBreaksStatus());
    dispatch(resetBreaksError());
    navigate("/manage-timers");
  };

  const handlePause = () => {
    dispatch(pauseTimer(timer.id));
  };

  const handlePlay = () => {
    dispatch(playTimer(timer.id));
  };

  const handleGoToTimerInfo = () => {
    setRenderTimerInfo(!renderTimerInfo);
  };

  const handleRestart = () => {
    dispatch(restartTimer(timer.id));
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
        className="border-t-2 border-b-2 border-black bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="relative h-full w-full p-2! pr-2! pb-1! md:pr-1! md:pb-2!">
          <div className="relative grid h-full w-full grid-cols-[60%_40%] grid-rows-none rounded-xl border-1 border-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:grid-cols-none md:grid-rows-[70%_30%] dark:border-gray-700 dark:bg-gray-800">
            <div className="absolute top-1 left-4 flex h-8 w-fit items-center justify-center rounded-xl hover:cursor-pointer">
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
            <div className="absolute top-3 right-4 z-20 flex h-fit w-fit items-center justify-center transition duration-300 ease-in-out hover:cursor-pointer">
              <button
                type="button"
                onClick={() => {
                  handleGoToTimerInfo();
                }}
                className="peer cursor-pointer border-0 bg-transparent p-0 transition ease-in-out hover:opacity-75 active:opacity-55"
              >
                <IoInformationCircleSharp className="h-5 w-5 fill-black dark:fill-gray-400" />
              </button>
              <div className="pointer-events-none absolute top-1/2 right-[110%] flex w-[100px] -translate-y-1/2 items-center justify-center rounded-tr-full rounded-br-full border-2 border-black bg-white p-1! opacity-0 shadow-[-2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition duration-200 ease-in-out peer-hover:opacity-100 md:w-[110px] dark:border-gray-700 dark:bg-gray-800">
                <h1 className="text-center text-[8px] text-black italic md:text-[9.5px] dark:text-white">
                  Click for {timer.title} info
                </h1>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row">
              <div className="flex flex-1 flex-col items-start justify-center md:flex-row md:items-center md:gap-2">
                <TimerItemCountdownContent
                  item={timer}
                  timeLeft={timeLeft}
                  setTimeLeft={setTimeLeft}
                  expiredStatus={expiredStatus}
                  setExpiredStatus={setExpiredStatus}
                  updateItem={setCountdownUpdate}
                  pauseStatus={pauseStatus}
                />
              </div>
            </div>
            <div className="grid grid-cols-none grid-rows-1 border-t-0 border-black md:mr-3! md:ml-3! md:grid-cols-1 md:grid-rows-none md:border-t-1 dark:border-gray-700">
              <AnimatePresence mode="wait" initial={false}>
                {expiredStatus ? (
                  <>
                    <motion.div
                      key="TimerItemComponentReset"
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
                      <GrPowerReset
                        onClick={() => {
                          handleRestart();
                        }}
                        className="h-12 w-12 fill-black transition duration-300 ease-in-out hover:cursor-pointer hover:stroke-blue-500 md:h-14 md:w-14 dark:fill-white"
                      />
                    </motion.div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </AnimatePresence>
            </div>
            {
              <AnimatePresence mode="wait">
                {renderTimerInfo && (
                  <motion.div
                    key="TimerItemComponentInfo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                      willChange: "transform",
                      backfaceVisibility: "hidden",
                    }}
                    className="absolute top-0 left-0 z-20 h-full w-full rounded-xl border-1 border-transparent bg-white dark:bg-gray-800"
                  >
                    <div className="relative h-full w-full">
                      <div className="absolute top-3 right-4 z-20 flex h-fit w-fit items-center justify-center transition duration-300 ease-in-out hover:cursor-pointer">
                        <button
                          type="button"
                          onClick={() => {
                            handleGoToTimerInfo();
                          }}
                          className="group cursor-pointer border-0 bg-transparent p-0 transition ease-in-out active:opacity-55"
                        >
                          <IoIosCloseCircleOutline className="h-5 w-5 fill-black transition duration-300 ease-in-out group-hover:fill-red-500 dark:fill-gray-400" />
                        </button>
                      </div>
                      <TimerItemInformationContent
                        item={timer}
                        timeLeft={timeLeft}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            }
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TimerItemComponent;
