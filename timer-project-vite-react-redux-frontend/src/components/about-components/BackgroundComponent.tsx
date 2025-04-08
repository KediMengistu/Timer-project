import { AnimatePresence, motion } from "framer-motion";

function BackgroundComponent() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`BackgroundComponent`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="relative grid h-full w-full flex-1 grid-rows-1 rounded-lg border-2 border-black bg-white pt-4! pb-4! dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex h-full w-full flex-col items-center justify-center border-t-2 border-b-2 border-black bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-full w-56 flex-col justify-center gap-1 p-1! md:w-96">
            <span className="text-left text-lg underline md:text-2xl dark:text-white">
              Background:
            </span>
            <span className="text-left text-xs md:text-sm dark:text-white">
              <span className="text-xs italic">
                Timer4U is a free web app for college students to manage study
                time. Users can make up to three 1-hour+ timers with breaks (10,
                15, or 20 minutes) spread out evenly. For example, a 1-hour
                timer with a 20-minute break will have the break start 20
                minutes in and end with 20 minutes left. If you pause a timer,
                the breaks won't move - they stay at the same times as set. It's
                better to use the breaks as planned rather than pausing. You
                need to verify your email to use the timers. If you can't get
                verification emails or can't do account actions like sign-up,
                password resets, or account deletion, it might be because the
                app's email service (SendGrid) isn't being paid for anymore. I
                hope this tool helps you! To get in touch, click{" "}
                <a
                  href="https://www.linkedin.com/in/kedamawi-mengistu-97371a2a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  here
                </a>
                .
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default BackgroundComponent;
