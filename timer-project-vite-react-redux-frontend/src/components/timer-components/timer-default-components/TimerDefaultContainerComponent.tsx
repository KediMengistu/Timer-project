import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router";

function TimerDefaultContainerComponent() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`TimerDefaultContainerComponent`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="relative grid h-full w-full flex-1 grid-rows-1 rounded-lg border-2 border-black bg-white pt-4! pb-4! dark:border-gray-700 dark:bg-gray-800"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

export default TimerDefaultContainerComponent;
