import { AnimatePresence, motion } from "motion/react";

function TimerHome() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-backgroundDiv`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="grid h-full w-full flex-1 grid-rows-1 rounded-lg border-2 border-black bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex items-center justify-center">
          <h1 className="text-md text-center text-black dark:text-white">
            Timer Home
          </h1>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TimerHome;
