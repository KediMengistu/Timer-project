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
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

function HomePage() {
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
  return (
    <>
      <div className="grid grid-cols-none grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] md:grid-rows-none">
        <nav className="sticky top-0 left-0 flex h-24 w-full flex-row gap-1 border-r-0 border-b-2 shadow-2xl md:h-full md:w-24 md:flex-col md:gap-2 md:border-r-2 md:border-b-0">
          <div className="flex flex-1 flex-row justify-center border-r-2 border-b-0 bg-black pr-2! pl-2! md:flex-col md:border-r-0 md:border-b-2">
            <div className="md: flex flex-row items-center justify-center p-2!">
              <h1 className="text-center text-xs text-white md:[text-orientation:upright] md:[writing-mode:vertical-rl]">
                TIMER4U
              </h1>
            </div>
          </div>
          <div className="mt-2! mb-2! flex flex-auto flex-row items-center justify-center gap-2 md:mt-0! md:mr-2! md:mb-0! md:ml-2! md:flex-col md:justify-start">
            <div className="flex flex-row gap-1 md:flex-col md:gap-2">
              <div className="relative">
                <div
                  className={`group flex flex-col items-center justify-center rounded-xl border-2 p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:p-1! ${userActionsState ? "bg-black" : "bg-white"}`}
                  onClick={() => {
                    dispatch(toggleUserActionsOption());
                  }}
                >
                  <RiUserShared2Fill
                    className={`h-4 w-4 transition ease-in-out group-hover:fill-white md:h-8 md:w-8 ${userActionsState ? "fill-white" : "fill-black"}`}
                  />
                  <h1
                    className={`text-center text-xs group-hover:text-white ${userActionsState ? "text-white" : "text-black"}`}
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
                      <div className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl">
                        <h1 className="text-xs text-black transition duration-300 ease-in-out group-hover:text-white">
                          Sign Up
                        </h1>
                      </div>
                      <div className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl">
                        <h1 className="text-xs text-black transition duration-300 ease-in-out group-hover:text-white">
                          Sign In
                        </h1>
                      </div>
                      <div className="group relative flex flex-row items-center justify-center rounded-tr-none rounded-br-2xl rounded-bl-2xl border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:rounded-bl-none">
                        <h1 className="text-center text-xs text-black transition duration-300 ease-in-out group-hover:text-white">
                          Forgot Password
                        </h1>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <div
                  className={`group flex flex-col items-center justify-center rounded-xl border-2 p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:p-1! ${guestTimerState ? "bg-black" : "bg-white"}`}
                  onClick={() => {
                    dispatch(toggleGuestTimerOption());
                  }}
                >
                  <BsIncognito
                    className={`h-4 w-4 transition ease-in-out group-hover:fill-white md:h-8 md:w-8 ${guestTimerState ? "fill-white" : "fill-black"}`}
                  />
                  <h1
                    className={`text-center text-xs group-hover:text-white ${guestTimerState ? "text-white" : "text-black"}`}
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
                      <div className="group relative flex flex-row items-center justify-center rounded-tr-none rounded-br-2xl rounded-bl-2xl border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:rounded-bl-none">
                        <h1 className="text-xs text-black transition duration-300 ease-in-out group-hover:text-white">
                          Create Timer
                        </h1>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <div
                  className={`group flex flex-col items-center justify-center rounded-xl border-2 p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:p-1! ${aboutOptionState ? "bg-black" : "bg-white"}`}
                  onClick={() => {
                    dispatch(toggleAboutOption());
                  }}
                >
                  <IoIosInformationCircle
                    className={`h-4 w-4 transition ease-in-out group-hover:fill-white md:h-8 md:w-8 ${aboutOptionState ? "fill-white" : "fill-black"}`}
                  />
                  <h1
                    className={`text-center text-xs group-hover:text-white ${aboutOptionState ? "text-white" : "text-black"}`}
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
                      <div className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl">
                        <h1 className="text-xs text-black transition duration-300 ease-in-out group-hover:text-white">
                          Stack
                        </h1>
                      </div>
                      <div className="group relative flex flex-row items-center justify-center rounded-tr-none rounded-br-2xl rounded-bl-2xl border-2 border-black bg-white p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:rounded-bl-none">
                        <h1 className="text-xs text-black transition duration-300 ease-in-out group-hover:text-white">
                          Background
                        </h1>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="mt-2! mb-2! flex flex-auto flex-row justify-end gap-2 pr-2! pb-0! md:mt-0! md:mr-2! md:mb-0! md:ml-2! md:flex-col md:pr-0! md:pb-2!">
            <div className="flex flex-row items-center justify-center gap-1 rounded-2xl border-2 bg-white p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] md:flex-col">
              <IoSunnyOutline className="h-4 w-4" />
              <label
                htmlFor="check"
                className="relative flex h-4 w-8 flex-row rounded-2xl bg-black hover:cursor-pointer md:h-16 md:w-8"
              >
                <input type="checkbox" id="check" className="peer sr-only" />
                <span className="absolute top-0.5 left-0.5 h-3 w-3 rounded-full border-2 border-black bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-4 peer-checked:border-white peer-checked:bg-black md:top-1 md:left-1 md:h-6 md:w-6 md:transform-gpu md:duration-200 md:ease-in-out md:peer-checked:translate-x-0 md:peer-checked:translate-y-8"></span>
              </label>
              <IoMoonOutline className="h-4 w-4" />
            </div>
          </div>
        </nav>
        <main className="flex h-full w-full flex-row bg-white bg-[radial-gradient(black_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="m-8! flex flex-1 flex-row items-center justify-center border-2 border-black bg-white md:m-16!">
            hello
          </div>
        </main>
      </div>
    </>
  );
}

export default HomePage;
