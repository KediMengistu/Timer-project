import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import TimerSelectScrollListComponent from "./TimerSelectScrollListComponent";

function TimerSelectScrollComponent() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstChild = container.children[0] as HTMLElement;
    const scrollWidth = firstChild.offsetWidth + 8; // width + margin

    container.scrollBy({
      left: -scrollWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstChild = container.children[0] as HTMLElement;
    const scrollWidth = firstChild.offsetWidth + 8; // width + margin

    container.scrollBy({
      left: scrollWidth,
      behavior: "smooth",
    });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${location.pathname}-TimerSelectScrollComponent`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          className="relative h-full w-full"
        >
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-4 flex h-8 w-8 -translate-y-1/2 flex-row items-center justify-center rounded-full text-center opacity-50 transition duration-300 ease-in-out hover:-translate-y-[65%] hover:cursor-pointer hover:opacity-100 active:opacity-75"
          >
            <span className="text-4xl text-white dark:text-gray-400">
              &larr;
            </span>
          </button>
          <div
            ref={scrollContainerRef}
            className="flex h-full w-full snap-x snap-mandatory scroll-p-1! items-center overflow-x-auto border-t-2 border-b-2 border-black bg-white pt-1! pr-1! pb-4! pl-1! whitespace-nowrap dark:border-gray-700 dark:bg-gray-800"
          >
            <TimerSelectScrollListComponent />
          </div>
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-4 flex h-8 w-8 -translate-y-1/2 flex-row items-center justify-center rounded-full text-center opacity-50 transition duration-300 ease-in-out hover:-translate-y-[65%] hover:cursor-pointer hover:opacity-100 active:opacity-75"
          >
            <span className="text-4xl text-white dark:text-gray-400">
              &rarr;
            </span>
          </button>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default TimerSelectScrollComponent;
