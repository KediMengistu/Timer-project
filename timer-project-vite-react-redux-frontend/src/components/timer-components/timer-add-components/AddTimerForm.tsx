import { AnimatePresence, motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CreateTimerDTO } from "../../../features/timers/timerDTO";
import {
  createTimer,
  resetTimersError,
  resetTimersStatus,
} from "../../../features/timers/timersSlice";

function AddTimerForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const timersState = useAppSelector((state) => state.timers);
  const [title, setTitle] = useState<string>("");
  const [durationHours, setDurationHours] = useState<string>("01");
  const [durationMinutes, setDurationMinutes] = useState<string>("00");
  const [durationSeconds, setDurationSeconds] = useState<string>("00");
  const [breakDuration, setBreakDuration] = useState<string>("10");

  // Formatting function
  const formatTimeValue = (value: string): string => {
    const numValue = parseInt(value);
    return numValue < 10 ? `0${numValue}` : value;
  };

  // Formatted setters
  const setFormattedHours = (value: string) => {
    setDurationHours(formatTimeValue(value));
  };

  const setFormattedMinutes = (value: string) => {
    setDurationMinutes(formatTimeValue(value));
  };

  const setFormattedSeconds = (value: string) => {
    setDurationSeconds(formatTimeValue(value));
  };

  const handleGoBackClick = () => {
    navigate("/manage-timers");
  };

  const incrementHours = () => {
    const currentHours = parseInt(durationHours);
    if (currentHours < 23) {
      setFormattedHours((currentHours + 1).toString());
    }
  };

  const decrementHours = () => {
    const currentHours = parseInt(durationHours);
    if (currentHours > 1) {
      setFormattedHours((currentHours - 1).toString());
    }
  };

  const incrementMinutes = () => {
    const currentMinutes = parseInt(durationMinutes);
    if (currentMinutes < 59) {
      setFormattedMinutes((currentMinutes + 1).toString());
    }
  };

  const decrementMinutes = () => {
    const currentMinutes = parseInt(durationMinutes);
    if (currentMinutes > 0) {
      setFormattedMinutes((currentMinutes - 1).toString());
    }
  };

  const incrementSeconds = () => {
    const currentSeconds = parseInt(durationSeconds);
    if (currentSeconds < 59) {
      setFormattedSeconds((currentSeconds + 1).toString());
    }
  };

  const decrementSeconds = () => {
    const currentSeconds = parseInt(durationSeconds);
    if (currentSeconds > 0) {
      setFormattedSeconds((currentSeconds - 1).toString());
    }
  };

  const handleBreakChange = (value: string) => {
    setBreakDuration(value);
  };

  useEffect(() => {
    if (timersState.status === "succeeded") {
      dispatch(resetTimersStatus());
      dispatch(resetTimersError());
      navigate("/manage-timers");
    }
  }, [timersState]);

  useEffect(() => {
    return () => {
      dispatch(resetTimersStatus());
      dispatch(resetTimersError());
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-AddTimerFormComponent`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="absolute top-[50%] left-[50%] h-72 w-64 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-black bg-white shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
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
              Timer Creation &#183; Build Your Timer
            </h1>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const createTimerDTO: CreateTimerDTO = {
                title,
                durationHours: parseInt(durationHours),
                durationMinutes: parseInt(durationMinutes),
                durationSeconds: parseInt(durationSeconds),
                breakDuration: parseInt(breakDuration),
              };
              dispatch(createTimer(createTimerDTO));
            }}
            className="grid grid-rows-[1fr_auto] gap-1"
          >
            <div className="grid grid-rows-5 gap-1">
              <div className="grid grid-cols-[27.5%_72.5%] pl-2!">
                <label
                  htmlFor="title"
                  className="flex items-center text-xs text-black hover:cursor-pointer dark:text-white"
                >
                  Title:
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Timer name"
                  autoComplete="off"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-2 border-black pl-1! text-xs text-black outline-0 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-[27.5%_72.5%] pl-2!">
                <label
                  htmlFor="hours"
                  className="flex items-center text-xs text-black hover:cursor-pointer dark:text-white"
                >
                  Hours:
                </label>
                <div className="grid w-full grid-cols-[25%_50%_25%]">
                  <button
                    type="button"
                    onClick={decrementHours}
                    className="group flex items-center justify-center rounded-tl-md rounded-bl-md border-2 border-black bg-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <span className="text-md text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                      -
                    </span>
                  </button>
                  <input
                    id="hours"
                    type="text"
                    value={durationHours}
                    readOnly
                    required
                    className="border-2 border-r-0 border-l-0 border-black text-center text-xs text-black outline-0 dark:border-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={incrementHours}
                    className="group flex items-center justify-center rounded-tr-md rounded-br-md border-2 border-black bg-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <span className="text-md text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                      +
                    </span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[27.5%_72.5%] pl-2!">
                <label
                  htmlFor="minutes"
                  className="flex items-center text-xs text-black hover:cursor-pointer dark:text-white"
                >
                  Minutes:
                </label>
                <div className="grid w-full grid-cols-[25%_50%_25%]">
                  <button
                    type="button"
                    onClick={decrementMinutes}
                    className="group flex items-center justify-center rounded-tl-md rounded-bl-md border-2 border-black bg-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <span className="text-md text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                      -
                    </span>
                  </button>
                  <input
                    id="minutes"
                    type="text"
                    value={durationMinutes}
                    readOnly
                    required
                    className="border-2 border-r-0 border-l-0 border-black text-center text-xs text-black outline-0 dark:border-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={incrementMinutes}
                    className="group flex items-center justify-center rounded-tr-md rounded-br-md border-2 border-black bg-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <span className="text-md text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                      +
                    </span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[27.5%_72.5%] pl-2!">
                <label
                  htmlFor="seconds"
                  className="flex items-center text-xs text-black hover:cursor-pointer dark:text-white"
                >
                  Seconds:
                </label>
                <div className="grid w-full grid-cols-[25%_50%_25%]">
                  <button
                    type="button"
                    onClick={decrementSeconds}
                    className="group flex items-center justify-center rounded-tl-md rounded-bl-md border-2 border-black bg-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <span className="text-md text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                      -
                    </span>
                  </button>
                  <input
                    id="seconds"
                    type="text"
                    value={durationSeconds}
                    readOnly
                    required
                    className="border-2 border-r-0 border-l-0 border-black text-center text-xs text-black outline-0 dark:border-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={incrementSeconds}
                    className="group flex items-center justify-center rounded-tr-md rounded-br-md border-2 border-black bg-white transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <span className="text-md text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                      +
                    </span>
                  </button>
                </div>
              </div>
              <div className="grid w-full grid-cols-[27.5%_72.5%] pl-2!">
                <label
                  htmlFor="breaks"
                  className="flex items-center text-[10px] text-black hover:cursor-pointer dark:text-white"
                >
                  Breaks Span:
                </label>
                <div className="flex w-full flex-row items-center justify-evenly border-2 border-black p-1! dark:border-gray-700">
                  <div
                    className="flex flex-1 cursor-pointer flex-row items-center justify-center"
                    onClick={() => handleBreakChange("10")}
                  >
                    <div
                      className={`h-4 w-4 border-2 border-black dark:border-gray-700 ${breakDuration === "10" ? "bg-black dark:bg-gray-700" : "bg-white dark:bg-gray-800"} rounded-full transition duration-300 ease-in-out`}
                    ></div>
                    <div className="flex flex-1 items-center justify-center">
                      <h1 className="text-center text-[10px] text-black dark:text-white">
                        10min
                      </h1>
                    </div>
                  </div>
                  <div
                    className="flex flex-1 cursor-pointer flex-row items-center justify-center"
                    onClick={() => handleBreakChange("15")}
                  >
                    <div
                      className={`h-4 w-4 border-2 border-black dark:border-gray-700 ${breakDuration === "15" ? "bg-black dark:bg-gray-700" : "bg-white dark:bg-gray-800"} rounded-full transition duration-300 ease-in-out`}
                    ></div>
                    <div className="flex flex-1 items-center justify-center">
                      <h1 className="text-center text-[10px] text-black dark:text-white">
                        15min
                      </h1>
                    </div>
                  </div>
                  <div
                    className="flex flex-1 cursor-pointer flex-row items-center justify-center"
                    onClick={() => handleBreakChange("20")}
                  >
                    <div
                      className={`h-4 w-4 border-2 border-black dark:border-gray-700 ${breakDuration === "20" ? "bg-black dark:bg-gray-700" : "bg-white dark:bg-gray-800"} rounded-full transition duration-300 ease-in-out`}
                    ></div>
                    <div className="flex flex-1 items-center justify-center">
                      <h1 className="text-center text-[9px] text-black dark:text-white">
                        20min
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center p-1!">
              <button
                type="submit"
                className="group flex flex-row items-center justify-center rounded-full border-2 border-white bg-white p-2! shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition ease-in-out hover:cursor-pointer hover:border-black hover:bg-black active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
              >
                <h1 className="text-center text-xs text-black group-hover:text-white dark:text-white">
                  Create
                </h1>
              </button>
            </div>
          </form>
          <AnimatePresence mode="wait">
            {timersState.error !== null && (
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
                  {timersState.error.message ===
                  `duplicate key value violates unique constraint "UQ_0aa5554b9dfb27791ba51b95efa"` ? (
                    <>Timer with title {title} already exists.</>
                  ) : (
                    timersState.error.message
                  )}
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AddTimerForm;
