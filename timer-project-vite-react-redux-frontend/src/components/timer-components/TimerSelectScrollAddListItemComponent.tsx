function TimerSelectScrollAddListItemComponent() {
  return (
    <div className="relative ml-2! inline h-[75%] w-full shrink-0 grow-0 snap-center snap-always rounded-sm bg-gray-300 align-middle whitespace-normal shadow-[inset_-28px_-24px_56px_#46464620] md:h-full dark:bg-transparent dark:shadow-[0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024,0px_3px_8px_0px_#00000024]">
      <button className="absolute top-[50%] left-[50%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white p-2! shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-300 ease-in-out hover:-translate-y-[65%] hover:cursor-pointer hover:opacity-75 active:opacity-50 dark:bg-gray-700 dark:shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)]">
        <span className="text-sm text-black dark:text-white">+ Add Timer</span>
      </button>
    </div>
  );
}

export default TimerSelectScrollAddListItemComponent;
