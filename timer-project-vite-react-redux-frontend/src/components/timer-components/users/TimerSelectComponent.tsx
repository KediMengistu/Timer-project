import { AnimatePresence, motion } from "motion/react";

function TimerSelectComponent() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-backgroundDiv`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="md:grid-rows-0 grid h-full w-full flex-1 gap-1 border-t-2 border-b-2 border-black bg-white p-1! md:grid-cols-3 dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="rounded-sm bg-black"></div>
        <div className="rounded-sm bg-black"></div>
        <div className="rounded-sm bg-black"></div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TimerSelectComponent;
