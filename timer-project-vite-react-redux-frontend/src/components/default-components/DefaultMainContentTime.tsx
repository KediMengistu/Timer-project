import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { extractAmPm } from "../../utils/functions/extractAMPM";

function DefaultMainContentTime() {
  const [time, setTime] = useState(new Date());
  const timezoneState = useAppSelector((state) => state.time.timezone);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  return (
    <AnimatePresence mode="wait">
      {timezoneState ? (
        <motion.div
          key="utcTimeDisplay"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          className="rounded-sm border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
        >
          <h1 className="text-center text-xs text-black dark:text-white">
            Current{" "}
            <span className="inline-block text-center font-bold text-red-500 italic underline underline-offset-2 dark:text-yellow-400">
              UTC
            </span>{" "}
            Time: <br />
            {String(time.getUTCHours()).padStart(2, "0")}
            hrs {String(time.getUTCMinutes()).padStart(2, "0")}
            min {String(time.getUTCSeconds()).padStart(2, "0")}s
            {` in the ${extractAmPm(String(time))}.`}
          </h1>
        </motion.div>
      ) : (
        <motion.div
          key="localTimeDisplay"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          className="rounded-sm border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
        >
          <h1 className="text-center text-xs text-black dark:text-white">
            Current{" "}
            <span className="inline-blocktext-center font-bold text-red-500 italic underline underline-offset-2 dark:text-yellow-400">
              Local
            </span>{" "}
            Time: <br />
            {String(time.getHours()).padStart(2, "0")}
            hrs {String(time.getMinutes()).padStart(2, "0")}
            min {String(time.getSeconds()).padStart(2, "0")}s
            {` in the ${extractAmPm(String(time))}.`}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DefaultMainContentTime;
