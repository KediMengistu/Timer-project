import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { AnimatePresence, motion } from "framer-motion";

function DefaultMainContent() {
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
        {timezoneState === "local" ? (
          <motion.span
            key="timezoneSpanLocal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block w-7 text-center font-bold text-red-500 italic underline underline-offset-2 dark:text-yellow-400"
          >
            Local
          </motion.span>
        ) : (
          <motion.span
            key="timezoneSpanUTC"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block w-7 text-center font-bold text-red-500 italic underline underline-offset-2 dark:text-yellow-400"
          >
            {timezoneState}
          </motion.span>
        )}
      </AnimatePresence>{" "}
      Time: <br />
      <AnimatePresence mode="wait">
        {timezoneState === "local" ? (
          <motion.span
            key="timeSpanLocal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}:
            {time.getMinutes() < 10
              ? "0" + time.getMinutes()
              : time.getMinutes()}
            :
            {time.getSeconds() < 10
              ? "0" + time.getSeconds()
              : time.getSeconds()}
            {time.getHours() < 12 ? " AM" : " PM"}
          </motion.span>
        ) : (
          <motion.span
            key="timeSpanUTC"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {time.getUTCHours() < 10
              ? "0" + time.getUTCHours()
              : time.getUTCHours()}
            :
            {time.getUTCMinutes() < 10
              ? "0" + time.getUTCMinutes()
              : time.getUTCMinutes()}
            :
            {time.getUTCSeconds() < 10
              ? "0" + time.getUTCSeconds()
              : time.getUTCSeconds()}
            {time.getUTCHours() < 12 ? " AM" : " PM"}
          </motion.span>
        )}
      </AnimatePresence>
    </h1>
  );
}

export default DefaultMainContent;
