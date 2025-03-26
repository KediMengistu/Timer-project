import { AnimatePresence, motion } from "motion/react";

function AddTimerForm() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-AddTimerFormComponent`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="absolute top-[50%] left-[50%] grid h-72 w-64 -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] gap-1 rounded-2xl border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
      ></motion.div>
    </AnimatePresence>
  );
}

export default AddTimerForm;
