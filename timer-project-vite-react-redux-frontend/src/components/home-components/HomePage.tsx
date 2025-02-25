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
      <div className="grid grid-cols-[auto_1fr] gap-1">
        <nav className="sticky top-0 bottom-0 left-0 flex w-24 flex-col justify-evenly gap-2 border-r-2 p-2! shadow-2xl">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-center">
              <h1 className="text-center text-xs [text-orientation:upright] [writing-mode:vertical-rl]">
                TIMER4U
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-center">
              <h1 className="text-center text-xs underline underline-offset-2">
                Click to Select:
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <div
                  className={`group flex flex-col items-center justify-center rounded-xl border-2 p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 ${userActionsState ? "bg-black" : "bg-white"}`}
                  onClick={() => {
                    dispatch(toggleUserActionsOption());
                  }}
                >
                  <RiUserShared2Fill
                    className={`h-12 w-12 transition ease-in-out group-hover:fill-white ${userActionsState ? "fill-white" : "fill-black"}`}
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
                      className="absolute top-0 right-[-125px] bottom-0 flex w-[108.067px] flex-col justify-evenly gap-0.5 rounded-2xl"
                    >
                      <div className="group relative flex flex-row items-center justify-center rounded-3xl border-2 border-black bg-black p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-white active:border-gray-300 active:bg-gray-200">
                        <h1 className="text-xs text-white transition duration-300 ease-in-out group-hover:text-black group-active:text-gray-500">
                          Sign Up
                        </h1>
                        <div className="absolute left-[-8px] h-0 w-0 border-t-8 border-r-8 border-b-8 border-t-transparent border-r-black border-b-transparent transition duration-300 ease-in-out group-active:border-r-gray-300"></div>
                      </div>
                      <div className="group relative flex flex-row items-center justify-center rounded-3xl border-2 border-black bg-black p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-white active:border-gray-300 active:bg-gray-200">
                        <h1 className="text-xs text-white transition duration-300 ease-in-out group-hover:text-black group-active:text-gray-500">
                          Sign In
                        </h1>
                        <div className="absolute left-[-8px] h-0 w-0 border-t-8 border-r-8 border-b-8 border-t-transparent border-r-black border-b-transparent transition duration-300 ease-in-out group-active:border-r-gray-300"></div>
                      </div>
                      <div className="group relative flex flex-row items-center justify-center rounded-3xl border-2 border-black bg-black p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-white active:border-gray-300 active:bg-gray-200">
                        <h1 className="text-center text-xs text-white transition duration-300 ease-in-out group-hover:text-black group-active:text-gray-500">
                          Forgot Password
                        </h1>
                        <div className="absolute left-[-8px] h-0 w-0 border-t-8 border-r-8 border-b-8 border-t-transparent border-r-black border-b-transparent transition duration-300 ease-in-out group-active:border-r-gray-300"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <div
                  className={`group flex flex-col items-center justify-center rounded-xl border-2 p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 ${guestTimerState ? "bg-black" : "bg-white"}`}
                  onClick={() => {
                    dispatch(toggleGuestTimerOption());
                  }}
                >
                  <BsIncognito
                    className={`h-12 w-12 transition ease-in-out group-hover:fill-white ${guestTimerState ? "fill-white" : "fill-black"}`}
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
                      className="absolute top-0 right-[-125px] bottom-0 flex w-[108.067px] flex-col justify-center rounded-2xl"
                    >
                      <div className="group relative flex flex-row items-center justify-center rounded-3xl border-2 border-black bg-black p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-white active:border-gray-300 active:bg-gray-200">
                        <h1 className="text-xs text-white transition duration-300 ease-in-out group-hover:text-black group-active:text-gray-500">
                          Create Timer
                        </h1>
                        <div className="absolute left-[-8px] h-0 w-0 border-t-8 border-r-8 border-b-8 border-t-transparent border-r-black border-b-transparent transition duration-300 ease-in-out group-active:border-r-gray-300"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <div
                  className={`group flex flex-col items-center justify-center rounded-xl border-2 p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 ${aboutOptionState ? "bg-black" : "bg-white"}`}
                  onClick={() => {
                    dispatch(toggleAboutOption());
                  }}
                >
                  <IoIosInformationCircle
                    className={`h-12 w-12 transition ease-in-out group-hover:fill-white ${aboutOptionState ? "fill-white" : "fill-black"}`}
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
                      className="absolute top-0 right-[-125px] bottom-0 flex w-[108.067px] flex-col justify-center gap-0.5 rounded-2xl"
                    >
                      <div className="group relative flex flex-row items-center justify-center rounded-3xl border-2 border-black bg-black p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-white active:border-gray-300 active:bg-gray-200">
                        <h1 className="text-xs text-white transition duration-300 ease-in-out group-hover:text-black group-active:text-gray-500">
                          Stack
                        </h1>
                        <div className="absolute left-[-8px] h-0 w-0 border-t-8 border-r-8 border-b-8 border-t-transparent border-r-black border-b-transparent transition duration-300 ease-in-out group-active:border-r-gray-300"></div>
                      </div>
                      <div className="group relative flex flex-row items-center justify-center rounded-3xl border-2 border-black bg-black p-2! transition duration-300 ease-in-out hover:cursor-pointer hover:bg-white active:border-gray-300 active:bg-gray-200">
                        <h1 className="text-xs text-white transition duration-300 ease-in-out group-hover:text-black group-active:text-gray-500">
                          Background
                        </h1>
                        <div className="absolute left-[-8px] h-0 w-0 border-t-8 border-r-8 border-b-8 border-t-transparent border-r-black border-b-transparent transition duration-300 ease-in-out group-active:border-r-gray-300"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-center">
              <h1 className="text-center text-xs underline underline-offset-2">
                Toggle For Dark Mode:
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)]">
              <IoSunnyOutline className="h-6 w-6" />
              <label
                htmlFor="check"
                className="relative flex h-16 w-8 flex-row rounded-2xl bg-black hover:cursor-pointer"
              >
                <input type="checkbox" id="check" className="peer sr-only" />
                <span className="absolute top-0.75 left-0.75 h-2/5 w-4/5 rounded-full border-2 border-black bg-white transition-all duration-150 peer-checked:top-8.5 peer-checked:border-white peer-checked:bg-black"></span>
              </label>
              <IoMoonOutline className="h-6 w-6" />
            </div>
          </div>
        </nav>
        <div className="flex h-full w-full flex-row bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
    </>
  );
}

export default HomePage;
