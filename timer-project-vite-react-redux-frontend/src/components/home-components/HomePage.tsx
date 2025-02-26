import { RiUserShared2Fill } from "react-icons/ri";
import { BsIncognito } from "react-icons/bs";
import { IoIosInformationCircle } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  toggleUserActionsOption,
  toggleGuestTimerOption,
  toggleAboutOption,
} from "../../features/defaultOptions/defaultOptionsSlice";
import { toggleTheme } from "../../features/theme/themeSlice";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useEffect } from "react";

function HomePage() {
  //false -> light & true -> dark
  const themeState = useAppSelector((state) => state.theme.value);
  const userActionsState = useAppSelector(
    (state) => state.defaultOptions.userActionsOption,
  );
  const guestTimerState = useAppSelector(
    (state) => state.defaultOptions.guestTimerOption,
  );
  const aboutOptionState = useAppSelector(
    (state) => state.defaultOptions.aboutOption,
  );
  const dispatch = useAppDispatch();

  // Apply or remove 'dark' class to the document based on theme state
  useEffect(() => {
    if (themeState) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeState]);

  return (
    <>
      <div className="grid grid-cols-none grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] md:grid-rows-none dark:bg-gray-900 dark:text-white">
        <nav className="sticky top-0 left-0 flex h-24 w-full flex-row gap-1 border-r-0 border-b-2 shadow-2xl md:h-full md:w-24 md:flex-col md:gap-2 md:border-r-2 md:border-b-0 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-1 flex-row justify-center bg-black pr-2! pl-2! md:flex-col dark:bg-gray-700">
            <div className="flex flex-row items-center justify-center p-2!">
              <h1 className="text-center text-xs text-white md:[text-orientation:upright] md:[writing-mode:vertical-rl]">
                TIMER4U
              </h1>
            </div>
          </div>
          <div className="mt-2! mb-2! flex flex-auto flex-row items-center justify-center gap-2 md:mt-0! md:mr-2! md:mb-0! md:ml-2! md:flex-col md:justify-start">
            <div className="flex flex-row gap-1 md:flex-col md:gap-2">
              <div className="relative">
                <div
                  className={`group flex flex-col items-center justify-center rounded-xl border-2 p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:p-1! dark:border-gray-600 dark:hover:bg-black ${
                    userActionsState ? "bg-black" : "bg-white dark:bg-gray-700"
                  }`}
                  onClick={() => {
                    dispatch(toggleUserActionsOption());
                  }}
                >
                  <RiUserShared2Fill
                    className={`h-4 w-4 transition ease-in-out group-hover:fill-white md:h-8 md:w-8 ${
                      userActionsState
                        ? "fill-white"
                        : "fill-black dark:fill-white"
                    }`}
                  />
                  <h1
                    className={`text-center text-xs group-hover:text-white ${
                      userActionsState
                        ? "text-white"
                        : "text-black dark:text-white"
                    }`}
                  >
                    User Actions
                  </h1>
                </div>
                <AnimatePresence>
                  {userActionsState && (
                    <motion.div
                      key="userActionsMenuDiv"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-[115%] left-1/2 flex h-auto w-[108.067px] -translate-x-1/2 flex-col gap-0.5 md:top-1/2 md:left-[125%] md:-translate-x-0 md:-translate-y-1/2"
                    >
                      <div className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-black">
                        <h1 className="text-xs text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                          Sign Up
                        </h1>
                      </div>
                      <div className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-black">
                        <h1 className="text-xs text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                          Sign In
                        </h1>
                      </div>
                      <div className="group relative flex flex-row items-center justify-center rounded-tr-none rounded-br-2xl rounded-bl-2xl border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:rounded-bl-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-black">
                        <h1 className="text-center text-xs text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                          Forgot Password
                        </h1>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <div
                  className={`group flex flex-col items-center justify-center rounded-xl border-2 p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:p-1! dark:border-gray-600 dark:hover:bg-black ${
                    guestTimerState ? "bg-black" : "bg-white dark:bg-gray-700"
                  }`}
                  onClick={() => {
                    dispatch(toggleGuestTimerOption());
                  }}
                >
                  <BsIncognito
                    className={`h-4 w-4 transition ease-in-out group-hover:fill-white md:h-8 md:w-8 ${
                      guestTimerState
                        ? "fill-white"
                        : "fill-black dark:fill-white"
                    }`}
                  />
                  <h1
                    className={`text-center text-xs group-hover:text-white ${
                      guestTimerState
                        ? "text-white"
                        : "text-black dark:text-white"
                    }`}
                  >
                    Guest User
                  </h1>
                </div>
                <AnimatePresence>
                  {guestTimerState && (
                    <motion.div
                      key="guestTimerMenuDiv"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-[115%] left-1/2 flex h-auto w-[108.067px] -translate-x-1/2 flex-col gap-0.5 md:top-1/2 md:left-[125%] md:-translate-x-0 md:-translate-y-1/2"
                    >
                      <div className="group relative flex flex-row items-center justify-center rounded-tr-none rounded-br-2xl rounded-bl-2xl border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:rounded-bl-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-black">
                        <h1 className="text-xs text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                          Create Timer
                        </h1>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <div
                  className={`group flex flex-col items-center justify-center rounded-xl border-2 p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:p-1! dark:border-gray-600 dark:hover:bg-black ${
                    aboutOptionState ? "bg-black" : "bg-white dark:bg-gray-700"
                  }`}
                  onClick={() => {
                    dispatch(toggleAboutOption());
                  }}
                >
                  <IoIosInformationCircle
                    className={`h-4 w-4 transition ease-in-out group-hover:fill-white md:h-8 md:w-8 ${
                      aboutOptionState
                        ? "fill-white"
                        : "fill-black dark:fill-white"
                    }`}
                  />
                  <h1
                    className={`text-center text-xs group-hover:text-white ${
                      aboutOptionState
                        ? "text-white"
                        : "text-black dark:text-white"
                    }`}
                  >
                    About Project
                  </h1>
                </div>
                <AnimatePresence>
                  {aboutOptionState && (
                    <motion.div
                      key="aboutMenuDiv"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-[115%] left-1/2 flex h-auto w-[108.067px] -translate-x-1/2 flex-col gap-0.5 md:top-1/2 md:left-[125%] md:-translate-x-0 md:-translate-y-1/2"
                    >
                      <div className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-black">
                        <h1 className="text-xs text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                          Stack
                        </h1>
                      </div>
                      <div className="group relative flex flex-row items-center justify-center rounded-tr-none rounded-br-2xl rounded-bl-2xl border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:rounded-bl-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-black">
                        <h1 className="text-xs text-black transition duration-300 ease-in-out group-hover:text-white dark:text-white">
                          Background
                        </h1>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="mt-2! mb-2! flex flex-auto flex-row items-center justify-end gap-2 pr-2! pb-0! md:mt-0! md:mr-2! md:mb-0! md:ml-2! md:flex-col md:pr-0! md:pb-2!">
            <button
              className="flex h-fit w-fit flex-row items-center justify-center rounded-md border-2 border-black bg-white p-2! hover:cursor-pointer hover:bg-black hover:text-white dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-black"
              onClick={() => {
                dispatch(toggleTheme());
              }}
            >
              <AnimatePresence mode="wait">
                {themeState ? (
                  <>
                    <motion.span
                      key="darkModeIcon"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <IoMoonOutline className="h-4 w-4 text-white" />
                    </motion.span>
                  </>
                ) : (
                  <>
                    <motion.span
                      key="lightModeIcon"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <IoSunnyOutline className="h-4 w-4" />
                    </motion.span>
                  </>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
        <main className="flex h-full w-full flex-row bg-white bg-[radial-gradient(black_1px,transparent_1px)] [background-size:16px_16px] dark:bg-gray-900 dark:bg-[radial-gradient(#4B5563_1px,transparent_1px)]">
          <div className="m-8! flex flex-1 flex-row items-center justify-center border-2 border-black bg-white md:m-16! dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            hello
          </div>
        </main>
      </div>
    </>
  );
}

export default HomePage;
