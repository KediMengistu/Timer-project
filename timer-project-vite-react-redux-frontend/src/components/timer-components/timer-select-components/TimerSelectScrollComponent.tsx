import { AnimatePresence, motion } from "framer-motion";
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
    const itemWidth = container.children[0]?.clientWidth + 8 || 0; // Add fallback for initial render

    // Only update if we have a valid width
    if (itemWidth > 0) {
      // Calculate active index based on scroll position
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
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

  // Set initial scroll position to show first item
  useEffect(() => {
    // This will ensure children have rendered
    const initializeScroll = () => {
      if (
        scrollContainerRef.current &&
        scrollContainerRef.current.children.length > 0
      ) {
        // Set scroll position to the beginning (left)
        scrollContainerRef.current.scrollTo({
          left: 0,
          behavior: "auto",
        });

        // Force an active index update
        setActiveIndex(0);

        // Also trigger the handleScroll to ensure everything is in sync
        handleScroll();
      } else {
        // If children aren't ready yet, try again in a short moment
        setTimeout(initializeScroll, 50);
      }
    };

    // Start the initialization process
    initializeScroll();

    // Also add a window load event handler as a fallback
    const handleWindowLoad = () => {
      initializeScroll();
    };

    window.addEventListener("load", handleWindowLoad);
    return () => window.removeEventListener("load", handleWindowLoad);
  }, []); // Empty dependency array means this runs once on mount

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
            className="absolute top-1/2 left-4 z-10 flex h-8 w-8 -translate-y-1/2 flex-row items-center justify-center rounded-full text-center transition duration-300 ease-in-out hover:-translate-y-[65%] hover:cursor-pointer"
          >
            <span className="text-4xl text-black dark:text-gray-500">
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
                    ? "bg-gray-600"
                    : "bg-gray-400 dark:bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-4 z-10 flex h-8 w-8 -translate-y-1/2 flex-row items-center justify-center rounded-full text-center transition duration-300 ease-in-out hover:-translate-y-[65%] hover:cursor-pointer"
          >
            <span className="text-4xl text-black dark:text-gray-500">
              &rarr;
            </span>
          </button>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default TimerSelectScrollComponent;
