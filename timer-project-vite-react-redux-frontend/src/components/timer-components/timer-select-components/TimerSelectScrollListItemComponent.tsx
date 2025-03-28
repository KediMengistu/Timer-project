import { useNavigate } from "react-router";
import { Timer } from "../../../features/timers/timerDTO";
import { extractAmPm } from "../../../utils/functions/extractAMPM";
import { extractDate } from "../../../utils/functions/extractDate";
import { extractTime } from "../../../utils/functions/extractTime";

function TimerSelectScrollListItemComponent({ item }: { item: Timer }) {
  const navigate = useNavigate();

  const handleGoToTimer = () => {
    navigate(`/manage-timers/${item.id}`);
  };

  return (
    <div className="relative ml-2! inline h-[75%] w-full shrink-0 grow-0 snap-center snap-always rounded-sm border-2 border-black bg-white align-middle whitespace-normal shadow-[0px_3.5px_0_0px_rgba(0,0,0,0.516)] md:h-full dark:border-gray-700 dark:bg-gray-800">
      <div className="absolute top-[50%] left-[50%] grid h-60 w-48 -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] rounded-2xl border-2 border-black bg-white p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b-2 border-b-black p-1! dark:border-b-gray-700">
          <h1 className="text-center text-xs text-black italic dark:text-white">
            {item.title} &#183; Basic Stats
          </h1>
        </div>
        <div className="m-1! grid grid-rows-[auto_1fr] rounded-md border-2 border-black p-1! dark:border-gray-700">
          <div className="grid grid-rows-5 p-1!">
            <div className="border-b-2 border-b-black p-1! dark:border-b-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Start Date:</span>
                <span className="font-bold italic">
                  {extractDate(item.startTime)}
                </span>
              </h1>
            </div>
            <div className="border-b-2 border-b-black p-1! dark:border-b-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Start Time: </span>
                <span className="font-bold italic">
                  {extractTime(item.startTime)} {extractAmPm(item.startTime)}
                </span>
              </h1>
            </div>
            <div className="border-b-2 border-b-black p-1! dark:border-b-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Duration Hours: </span>
                <span className="font-bold italic">
                  {item.durationHours < 10
                    ? `0${item.durationHours} hrs`
                    : `${item.durationHours} hrs`}
                </span>
              </h1>
            </div>
            <div className="border-b-2 border-b-black p-1! dark:border-b-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Duration Minutes: </span>
                <span className="font-bold italic">
                  {item.durationMinutes < 10
                    ? `0${item.durationMinutes} min`
                    : `${item.durationMinutes} min`}
                </span>
              </h1>
            </div>
            <div className="border-b-2 border-b-black p-1! dark:border-b-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Duration Seconds: </span>
                <span className="font-bold italic">
                  {item.durationSeconds < 10
                    ? `0${item.durationSeconds} s`
                    : `${item.durationSeconds} s`}
                </span>
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 p-1!">
            <button
              onClick={() => {
                handleGoToTimer();
              }}
              className="group flex flex-row items-center justify-center rounded-full border-2 border-white bg-white p-2! shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition ease-in-out hover:cursor-pointer hover:border-red-500 hover:bg-red-500 active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-red-500 dark:hover:bg-red-500"
            >
              <span className="text-center text-[8px] text-black group-hover:text-white dark:text-white">
                Delete Timer
              </span>
            </button>
            <button
              onClick={() => {
                handleGoToTimer();
              }}
              className="group flex items-center justify-center rounded-full border-2 border-black bg-black p-2! shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-300 ease-in-out hover:cursor-pointer hover:bg-white active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:hover:bg-gray-800"
            >
              <span className="text-left text-[8px] text-white group-hover:text-black dark:group-hover:text-white">
                Open Timer &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimerSelectScrollListItemComponent;
