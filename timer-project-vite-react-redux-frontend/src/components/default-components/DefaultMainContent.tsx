import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "react-router";

function DefaultMainContent() {
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
        Default
      </motion.div>
    </AnimatePresence>
  );
}

export default DefaultMainContent;
