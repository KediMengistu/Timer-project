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
    <h1 className="text-center text-xs text-black dark:text-white">
      Current{" "}
      <AnimatePresence mode="wait">
        {timezoneState ? (
          <motion.span
            key="timezoneSpanLocal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
            className="inline-block w-8 text-center font-bold text-red-500 italic underline underline-offset-2 dark:text-yellow-400"
          >
            Local
          </motion.span>
        ) : (
          <motion.span
            key="timezoneSpanUTC"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
            className="inline-block w-8 text-center font-bold text-red-500 italic underline underline-offset-2 dark:text-yellow-400"
          >
            UTC
          </motion.span>
        )}
      </AnimatePresence>{" "}
      Time: <br />
      <AnimatePresence mode="wait">
        {timezoneState ? (
          <motion.span
            key="timeSpanLocal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          >
            {time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}hrs{" "}
            {time.getMinutes() < 10
              ? "0" + time.getMinutes()
              : time.getMinutes()}
            min{" "}
            {time.getSeconds() < 10
              ? "0" + time.getSeconds()
              : time.getSeconds()}
            s{time.getHours() < 12 ? " in the AM" : " in the PM"}.
          </motion.span>
        ) : (
          <motion.span
            key="timeSpanUTC"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          >
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
          </motion.span>
        )}
      </AnimatePresence>
    </h1>
  );
}

export default DefaultMainContentTime;
