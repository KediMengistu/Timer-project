import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import TimerSelectScrollListComponent from "./TimerSelectScrollListComponent";

function TimerSelectScrollComponent() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle scroll event and update active index
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.children[0].clientWidth + 8; // width + margin

    // Calculate active index based on scroll position
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [activeIndex]);

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

  // Function to scroll to a specific snap point when indicator is clicked
  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstChild = container.children[0] as HTMLElement;
    const scrollWidth = firstChild.offsetWidth + 8;

    container.scrollTo({
      left: index * scrollWidth,
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
            className="absolute top-1/2 left-4 z-10 flex h-8 w-8 -translate-y-1/2 flex-row items-center justify-center rounded-full text-center opacity-50 transition duration-300 ease-in-out hover:-translate-y-[65%] hover:cursor-pointer hover:opacity-100 active:opacity-75"
          >
            <span className="text-4xl text-white dark:text-gray-400">
              &larr;
            </span>
          </button>
          <div
            ref={scrollContainerRef}
            className="scrollbar-none flex h-full w-full snap-x snap-mandatory scroll-p-1! items-center overflow-x-auto border-t-2 border-b-2 border-black bg-white pt-1! pr-1! pb-1! pl-1! whitespace-nowrap md:pb-4! dark:border-gray-700 dark:bg-gray-800"
          >
            <TimerSelectScrollListComponent />
          </div>
          <div className="absolute bottom-[20%] left-[50%] z-10 flex w-8 -translate-x-1/2 items-center justify-between md:bottom-[10%]">
            {Array.from({
              length: scrollContainerRef.current?.children.length || 3,
            }).map((_, index) => (
              <div
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 w-2 cursor-pointer rounded-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition-colors duration-300 ${
                  index === activeIndex
                    ? "bg-white dark:bg-white"
                    : "bg-gray-500 dark:bg-gray-600"
                }`}
              ></div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-4 z-10 flex h-8 w-8 -translate-y-1/2 flex-row items-center justify-center rounded-full text-center opacity-50 transition duration-300 ease-in-out hover:-translate-y-[65%] hover:cursor-pointer hover:opacity-100 active:opacity-75"
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
