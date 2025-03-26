function TimerSelectScrollAddListItemComponent() {
  return (
    <div className="relative ml-2! inline h-[75%] w-full shrink-0 grow-0 snap-center snap-always rounded-sm bg-white align-middle whitespace-normal md:h-full dark:bg-transparent">
      <button className="group absolute top-[50%] left-[50%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 border-black bg-white p-2! shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:hover:bg-gray-800">
        <span className="text-sm text-black italic group-hover:text-white dark:text-white">
          + Add Timer
        </span>
      </button>
    </div>
  );
}

export default TimerSelectScrollAddListItemComponent;
