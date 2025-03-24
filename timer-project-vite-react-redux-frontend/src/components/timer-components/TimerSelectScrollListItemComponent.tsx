function TimerSelectScrollListItemComponent({ item }: { item: any }) {
  return (
    <div className="ml-1! inline-flex h-[75%] w-full shrink-0 grow-0 snap-center snap-always items-center justify-center rounded-sm border-2 border-black bg-black align-middle whitespace-normal shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] md:h-full dark:border-gray-700 dark:bg-gray-700">
      <h1 className="text-md text-white dark:text-white">{item.startTime}</h1>
    </div>
  );
}

export default TimerSelectScrollListItemComponent;
