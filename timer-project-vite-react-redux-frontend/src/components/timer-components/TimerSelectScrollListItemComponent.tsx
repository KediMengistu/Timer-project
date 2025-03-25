function TimerSelectScrollListItemComponent({ item }: { item: any }) {
  return (
    <div className="ml-2! inline-flex h-[75%] w-full shrink-0 grow-0 snap-center snap-always items-center justify-center rounded-sm bg-black align-middle whitespace-normal shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] md:h-full">
      <h1 className="text-md text-white dark:text-white">{item.startTime}</h1>
    </div>
  );
}

export default TimerSelectScrollListItemComponent;
