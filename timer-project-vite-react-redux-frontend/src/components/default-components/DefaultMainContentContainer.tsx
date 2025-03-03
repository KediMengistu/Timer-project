import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "react-router";
import DefaultMainContent from "./DefaultMainContent";

function DefaultMainContentContainer() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="flex flex-1 items-center justify-center"
      >
        <div className="pointer-events-none flex w-64 items-center justify-center rounded-sm border-2 border-black p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700">
          <DefaultMainContent />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DefaultMainContentContainer;
