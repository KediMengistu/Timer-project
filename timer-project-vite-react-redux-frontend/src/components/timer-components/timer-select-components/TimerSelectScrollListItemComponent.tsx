import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Timer } from "../../../features/timers/timerDTO";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  resetTimersError,
  resetTimersStatus,
} from "../../../features/timers/timersSlice";

function TimerSelectScrollListItemComponent({ item }: { item: Timer }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const deleteTimersState = useAppSelector((state) => state.timers);

  useEffect(() => {
    if (deleteTimersState.status === "succeeded") {
      dispatch(resetTimersStatus());
      dispatch(resetTimersError());
    }
  }, [deleteTimersState]);

  useEffect(() => {
    return () => {
      dispatch(resetTimersStatus());
      dispatch(resetTimersError());
    };
  }, []);

  const handleGoToTimer = () => {
    navigate(`/manage-timers/${item.id}`);
  };

  const handleGoToDeleteTimer = () => {
    navigate(`/manage-timers/delete-timer/${item.id}`);
  };

  return (
    <div className="relative ml-2! inline h-[85%] w-full shrink-0 grow-0 snap-center snap-always rounded-sm border-1 border-black bg-white align-middle whitespace-normal shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:h-full dark:border-gray-700 dark:bg-gray-800">
      <div className="absolute top-[50%] left-[50%] grid h-24 w-48 -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] rounded-2xl bg-white p-1! shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-1 dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b-1 border-b-black p-1! dark:border-b-gray-700">
          <h1 className="text-center text-xs text-black italic dark:text-white">
            {item.title}
          </h1>
        </div>
        <div className="m-1! grid grid-rows-1 rounded-md border-1 border-transparent p-1!">
          <div className="grid grid-cols-2 gap-1 p-1!">
            <button
              onClick={() => {
                handleGoToDeleteTimer();
              }}
              className="group flex flex-row items-center justify-center rounded-full border-2 border-white bg-white p-2! shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition ease-in-out hover:cursor-pointer hover:border-red-500 hover:bg-red-500 active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-red-500 dark:hover:bg-red-500"
            >
              <span className="text-center text-[8px] text-black group-hover:text-white dark:text-white">
                Delete Timer
              </span>
            </button>
            <button
              onClick={() => {
                handleGoToTimer();
              }}
              className="group flex items-center justify-center rounded-full border-2 border-black bg-black p-2! shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-300 ease-in-out hover:cursor-pointer hover:bg-white active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
            >
              <span className="text-left text-[8px] text-white group-hover:text-black dark:group-hover:text-white">
                Open Timer &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {deleteTimersState.error !== null && (
          <motion.div
            key={`APIErrorDeleteTimerDiv-${JSON.stringify(deleteTimersState.error)}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
            className="absolute top-[98%] left-1/2 h-fit w-[150px] -translate-x-1/2 rounded-sm border-1 border-black bg-red-400 p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
          >
            <h1 className="text-center text-[8px] text-black md:text-[9px] dark:text-white">
              Delete failed. Try again later.
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TimerSelectScrollListItemComponent;
