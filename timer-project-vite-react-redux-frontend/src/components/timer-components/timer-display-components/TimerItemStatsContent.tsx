import { Timer } from "../../../features/timers/timerDTO";

function TimerItemStatsContent({ item }: { item: Timer }) {
  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr] rounded-xl border-1 border-black bg-white pb-3! shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-row items-center justify-center p-1!">
        <span className="text-center text-xs text-black italic underline underline-offset-2 dark:text-white">
          Stats for {item.title}
        </span>
      </div>
      <div className=""></div>
    </div>
  );
}

export default TimerItemStatsContent;
