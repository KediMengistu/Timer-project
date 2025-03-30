import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Timer } from "../../../features/timers/timerDTO";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  deleteTimer,
  resetTimersError,
  resetTimersStatus,
} from "../../../features/timers/timersSlice";
import { ApiErrorResponse } from "../../../app/appTypes";

function DeleteTimerForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const timersState = useAppSelector((state) => state.timers);
  const { id } = useParams<{ id: string }>();
  const [timer, setTimer] = useState<Timer | null>(null);
  const [nonAPIError, setNonAPIError] = useState<ApiErrorResponse | null>(null);

  useEffect(() => {
    if (id) {
      setTimer(timersState.entities[id]);
    }
  }, []);

  useEffect(() => {
    if (timersState.status === "succeeded") {
      dispatch(resetTimersStatus());
      dispatch(resetTimersError());
      navigate("/manage-timers", { replace: true });
    }
  }, [timersState]);

  useEffect(() => {
    return () => {
      dispatch(resetTimersStatus());
      dispatch(resetTimersError());
    };
  }, []);

  const handleGoBackClick = () => {
    navigate("/manage-timers");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-AddTimerFormComponent`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="absolute top-[50%] left-[50%] h-36 w-64 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-black bg-white shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="relative grid h-full w-full grid-rows-[auto_1fr] gap-2 p-2!">
          <div className="relative flex items-center justify-center border-b-2 border-black p-2! dark:border-gray-700">
            <div className="absolute top-1/2 left-2 flex -translate-y-1/2 items-center justify-center">
              <button
                type="button"
                onClick={handleGoBackClick}
                className="peer cursor-pointer border-0 bg-transparent p-0 transition ease-in-out hover:opacity-55"
              >
                <FaCircleArrowLeft />
              </button>
              <div className="pointer-events-none absolute top-1/2 right-[110%] flex w-[55px] -translate-y-1/2 items-center justify-center rounded-tr-full rounded-br-full border-2 border-black bg-white p-1! opacity-0 shadow-[-2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition duration-200 ease-in-out peer-hover:opacity-100 md:w-[70px] dark:border-gray-700 dark:bg-gray-800">
                <h1 className="text-center text-[10px] text-black italic md:text-xs dark:text-white">
                  Go Back
                </h1>
              </div>
            </div>
            <h1 className="text-center text-xs text-black italic dark:text-white">
              Timer Deletion &#183; Remove Timer
            </h1>
          </div>
          <div className="grid grid-rows-[1fr_auto] gap-1">
            <div className="flex items-center justify-center">
              <h1 className="text-center text-xs text-black dark:text-white">
                Are you sure you want to delete {timer?.title}?
              </h1>
            </div>
            <div className="flex flex-row items-center justify-center p-1!">
              <button
                type="button"
                onClick={() => {
                  if (nonAPIError !== null) {
                    setNonAPIError(null);
                  }
                  if (timer?.id) {
                    dispatch(deleteTimer(timer?.id));
                  } else {
                    const error: ApiErrorResponse = {
                      timestamp: new Date().toISOString(),
                      path: location.pathname,
                      message:
                        "Timer delete failed. Refresh or sign out & in to retry.",
                      statusCode: 400,
                    };
                    setNonAPIError(error);
                  }
                }}
                className="group flex flex-row items-center justify-center rounded-full border-2 border-white bg-white p-2! shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition ease-in-out hover:cursor-pointer hover:border-red-500 hover:bg-red-500 active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-red-500 dark:hover:bg-red-500"
              >
                <h1 className="text-center text-xs text-black group-hover:text-white dark:text-white">
                  Delete Timer
                </h1>
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {nonAPIError !== null ? (
              <motion.div
                key={`nonAPIErrorDeleteTimerDiv-${JSON.stringify(nonAPIError)}`}
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
                  {nonAPIError.message}
                </h1>
              </motion.div>
            ) : timersState.error !== null ? (
              <motion.div
                key={`APIErrorAddTimerDiv-${JSON.stringify(timersState.error)}`}
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
                  {timersState.error.message}
                </h1>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DeleteTimerForm;
