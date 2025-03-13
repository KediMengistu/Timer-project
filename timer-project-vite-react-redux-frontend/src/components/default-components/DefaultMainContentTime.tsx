import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { AnimatePresence, motion } from "framer-motion";

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
            {time.getUTCHours() < 10
              ? "0" + time.getUTCHours()
              : time.getUTCHours()}
            hrs{" "}
            {time.getUTCMinutes() < 10
              ? "0" + time.getUTCMinutes()
              : time.getUTCMinutes()}
            min{" "}
            {time.getUTCSeconds() < 10
              ? "0" + time.getUTCSeconds()
              : time.getUTCSeconds()}
            s{time.getUTCHours() < 12 ? " in the AM" : " in the PM"}.
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
            {time.getHours() < 10
              ? "0" + time.getHours()
              : time.getHours()}hrs{" "}
            {time.getMinutes() < 10
              ? "0" + time.getMinutes()
              : time.getMinutes()}
            min{" "}
            {time.getSeconds() < 10
              ? "0" + time.getSeconds()
              : time.getSeconds()}
            s{time.getHours() < 12 ? " in the AM" : " in the PM"}.
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DefaultMainContentTime;
