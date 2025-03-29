import { AnimatePresence, motion } from "framer-motion";

function Timer() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="TimerComponent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="grid grid-rows-[70%_30%] border-t-2 border-b-2 border-black dark:border-gray-700 dark:bg-gray-700"
      >
        <div></div>
        <div className="h-full w-full bg-orange-500">
          <div className="relative flex h-full w-full items-center justify-center bg-purple-500">
            <div className="relative h-[50%] w-[75%] border-r-2 border-l-2 border-black">
              <span className="absolute top-[-25%] left-0 -translate-x-1/2 -translate-y-1/2 font-bold text-black italic underline underline-offset-2">
                Start
              </span>
              <hr className="absolute top-[50%] left-[50%] w-full -translate-x-1/2 -translate-y-1/2 border-1 border-black dark:border-gray-800"></hr>
              <span className="absolute top-[-25%] right-[-2.5%] -translate-x-1/2 -translate-y-1/2 font-bold text-black italic underline underline-offset-2">
                End
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Timer;

{
  /* <div className="relative">
  <div className="absolute top-[50%] left-[50%] flex h-[50%] w-[75%] -translate-x-1/2 -translate-y-1/2 items-center border-r-2 border-l-2 border-black">
    <hr className="w-full border-1 border-black dark:border-gray-800"></hr>
  </div>
</div>; */
}
