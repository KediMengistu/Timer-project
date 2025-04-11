import { AnimatePresence, motion } from "framer-motion";

function StackComponent() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`StackComponent`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="relative grid h-full w-full flex-1 grid-rows-1 rounded-lg border-2 border-black bg-white pt-4! pb-4! dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex h-full w-full flex-col items-center justify-center border-t-2 border-b-2 border-black bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className="flex h-full w-fit flex-col justify-center gap-1 p-1!">
            <span className="text-left text-lg underline md:text-2xl">
              Tech Stack:
            </span>
            <span className="text-left text-xs md:text-sm">
              <span className="font-bold">&#183; Backend:</span>
              <br />
              <span className="italic">
                &rarr; TypeScript &rarr; NestJS &rarr; SendGrid API
              </span>
            </span>
            <span className="text-left text-xs md:text-sm">
              <span className="font-bold">&#183; Database Management:</span>
              <br />
              <span className="italic">&rarr; PostgreSQL</span>
            </span>
            <span className="text-left text-xs md:text-sm">
              <span className="font-bold">&#183; Frontend:</span>
              <br />
              <span className="italic">
                &rarr; Vite &rarr; React &rarr; Tailwind
                <br />
                &rarr; Framer Motion &rarr; Redux Toolkit
                <br />
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default StackComponent;
