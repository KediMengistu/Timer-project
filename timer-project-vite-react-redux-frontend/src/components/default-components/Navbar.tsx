import { RiUserShared2Fill } from "react-icons/ri";
import { IoIosInformationCircle } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleTheme } from "../../features/theme/themeSlice";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { toggleTimezone } from "../../features/time/timeSlice";

function Navbar() {
  const [userActionsState, setUserActionsState] = useState(false);
  const [aboutOptionState, setAboutOptionsState] = useState(false);
  const darkModeState = useAppSelector((state) => state.theme.darkMode);
  const timezoneState = useAppSelector((state) => state.time.timezone);
  const signedInState = useAppSelector((state) => state.auth.isSignedIn);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    closeAllMenus();
  }, [location.pathname]);

  const closeAllMenus = () => {
    setUserActionsState(false);
    setAboutOptionsState(false);
  };

  return (
    <nav className="sticky top-0 left-0 z-10 flex h-28 w-full flex-row gap-1 border-r-0 border-b-2 bg-white shadow-2xl md:h-full md:w-26 md:flex-col md:gap-2 md:border-r-2 md:border-b-0 dark:border-gray-700 dark:bg-gray-800">
      <NavLink
        to="/"
        end
        style={({ isActive }) => {
          return isActive
            ? {
                textDecoration: "none",
              }
            : {
                textDecoration: "none",
              };
        }}
        onClick={() => {
          closeAllMenus();
        }}
        className="flex flex-auto flex-row justify-center bg-black pr-1! pl-1! md:flex-1 md:flex-col md:pr-2! md:pl-2! dark:bg-gray-700"
      >
        <div className="flex flex-row items-center justify-center p-2!">
          <h1 className="text-center text-[8.5px] text-white md:[text-orientation:upright] md:[writing-mode:vertical-rl] 2xl:text-xs">
            TIMER4U
          </h1>
        </div>
      </NavLink>
      <div className="mt-2! mb-2! flex flex-auto flex-row items-center justify-center gap-2 md:mt-0! md:mr-2! md:mb-0! md:ml-2! md:flex-col md:justify-start">
        <div className="flex flex-row gap-1 md:flex-col md:gap-2">
          <div className="relative">
            <div
              className={`group flex flex-col items-center justify-center rounded-xl border-2 p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:p-1! dark:border-gray-600 dark:hover:bg-gray-800 ${
                userActionsState
                  ? "bg-black dark:bg-gray-800"
                  : "bg-white dark:bg-gray-700"
              }`}
              onClick={() => {
                setUserActionsState(!userActionsState);
                setAboutOptionsState(false);
              }}
            >
              <RiUserShared2Fill
                className={`h-4 w-4 transition ease-in-out group-hover:fill-white md:h-8 md:w-8 ${
                  userActionsState ? "fill-white" : "fill-black dark:fill-white"
                }`}
              />
              <h1
                className={`text-center text-xs group-hover:text-white ${
                  userActionsState ? "text-white" : "text-black dark:text-white"
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
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                  className="absolute top-[115%] left-1/2 z-20 flex h-auto w-[75px] -translate-x-1/2 flex-col gap-0.5 md:top-1/2 md:left-[125%] md:w-[108.067px] md:-translate-x-0 md:-translate-y-1/2"
                >
                  <NavLink
                    to={!signedInState ? "/signup" : "/account-info"}
                    end
                    style={({ isActive }) => {
                      return isActive
                        ? {
                            textDecoration: "none",
                          }
                        : {
                            textDecoration: "none",
                          };
                    }}
                    onClick={() => {
                      closeAllMenus();
                    }}
                    className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! shadow-[4px_4px_0_2px_rgba(0,0,0,0.516)] transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:shadow-[-4px_4px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <h1 className="text-[8px] text-black transition duration-300 ease-in-out group-hover:text-white md:text-[10px] dark:text-white">
                      {!signedInState ? <>Sign Up</> : <>Account Info</>}
                    </h1>
                  </NavLink>
                  <NavLink
                    to={!signedInState ? "/signin" : "/signout"}
                    end
                    style={({ isActive }) => {
                      return isActive
                        ? {
                            textDecoration: "none",
                          }
                        : {
                            textDecoration: "none",
                          };
                    }}
                    onClick={() => {
                      closeAllMenus();
                    }}
                    className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! shadow-[4px_4px_0_2px_rgba(0,0,0,0.516)] transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:shadow-[-4px_4px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <h1 className="text-[8px] text-black transition duration-300 ease-in-out group-hover:text-white md:text-[10px] dark:text-white">
                      {!signedInState ? <>Sign In</> : <>Sign Out</>}
                    </h1>
                  </NavLink>
                  <NavLink
                    to={!signedInState ? "/signin" : "/manage-timers"}
                    end
                    style={({ isActive }) => {
                      return isActive
                        ? {
                            textDecoration: "none",
                          }
                        : {
                            textDecoration: "none",
                          };
                    }}
                    onClick={() => {
                      closeAllMenus();
                    }}
                    className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! shadow-[4px_4px_0_2px_rgba(0,0,0,0.516)] transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:shadow-[-4px_4px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <h1 className="text-center text-[8px] text-black transition duration-300 ease-in-out group-hover:text-white md:text-[9px] dark:text-white">
                      <>Manage Timers</>
                    </h1>
                  </NavLink>
                  <NavLink
                    to={!signedInState ? "/forgotpassword" : "/delete-account"}
                    end
                    style={({ isActive }) => {
                      return isActive
                        ? {
                            textDecoration: "none",
                          }
                        : {
                            textDecoration: "none",
                          };
                    }}
                    onClick={() => {
                      closeAllMenus();
                    }}
                    className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! shadow-[4px_4px_0_2px_rgba(0,0,0,0.516)] transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:shadow-[-4px_4px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <h1 className="text-center text-[7px] text-black transition duration-300 ease-in-out group-hover:text-white md:text-[10px] dark:text-white">
                      {!signedInState ? (
                        <>Forgot Password</>
                      ) : (
                        <>Delete Account</>
                      )}
                    </h1>
                  </NavLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="relative">
            <div
              className={`group flex flex-col items-center justify-center rounded-xl border-2 p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:p-1! dark:border-gray-600 dark:hover:bg-gray-800 ${
                aboutOptionState
                  ? "bg-black dark:bg-gray-800"
                  : "bg-white dark:bg-gray-700"
              }`}
              onClick={() => {
                setUserActionsState(false);
                setAboutOptionsState(!aboutOptionState);
              }}
            >
              <IoIosInformationCircle
                className={`h-4 w-4 transition ease-in-out group-hover:fill-white md:h-8 md:w-8 ${
                  aboutOptionState ? "fill-white" : "fill-black dark:fill-white"
                }`}
              />
              <h1
                className={`text-center text-xs group-hover:text-white ${
                  aboutOptionState ? "text-white" : "text-black dark:text-white"
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
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                  className="absolute top-[115%] left-1/2 z-20 flex h-auto w-[75px] -translate-x-1/2 flex-col gap-0.5 md:top-1/2 md:left-[125%] md:w-[108.067px] md:-translate-x-0 md:-translate-y-1/2"
                >
                  <NavLink
                    to="/stack"
                    end
                    style={({ isActive }) => {
                      return isActive
                        ? {
                            textDecoration: "none",
                          }
                        : {
                            textDecoration: "none",
                          };
                    }}
                    onClick={() => {
                      closeAllMenus();
                    }}
                    className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! shadow-[4px_4px_0_2px_rgba(0,0,0,0.516)] transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:shadow-[-4px_4px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <h1 className="text-center text-[8px] text-black transition duration-300 ease-in-out group-hover:text-white md:text-[10px] dark:text-white">
                      Stack
                    </h1>
                  </NavLink>
                  <NavLink
                    to="/background"
                    end
                    style={({ isActive }) => {
                      return isActive
                        ? {
                            textDecoration: "none",
                          }
                        : {
                            textDecoration: "none",
                          };
                    }}
                    onClick={() => {
                      closeAllMenus();
                    }}
                    className="group relative flex flex-row items-center justify-center border-2 border-black bg-white p-2! shadow-[4px_4px_0_2px_rgba(0,0,0,0.516)] transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:opacity-55 md:rounded-tr-3xl md:rounded-br-3xl md:shadow-[-4px_4px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
                  >
                    <h1 className="text-center text-[8px] text-black transition duration-300 ease-in-out group-hover:text-white md:text-[10px] dark:text-white">
                      Background
                    </h1>
                  </NavLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="mt-2! mb-2! flex flex-auto flex-col items-center justify-center gap-1 pr-2! pb-0! md:mt-0! md:mr-2! md:mb-0! md:ml-2! md:justify-end md:gap-2 md:pr-0! md:pb-2!">
        <button
          className="flex h-fit w-[86px] flex-row rounded-md border-2 border-black bg-black p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer active:opacity-55 md:w-full dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          onClick={() => {
            dispatch(toggleTimezone());
          }}
        >
          <h1 className="text-center text-xs text-white">
            Timezone:<span> </span>
            <span>
              <AnimatePresence mode="wait">
                {!timezoneState ? (
                  <>
                    <motion.span
                      key="timezoneSpanLocal"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      Local
                    </motion.span>
                  </>
                ) : (
                  <>
                    <motion.span
                      key="timezoneSpanUTC"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      UTC
                    </motion.span>
                  </>
                )}
              </AnimatePresence>
            </span>
          </h1>
        </button>
        <button
          className="flex h-fit w-fit flex-row items-center justify-center rounded-md border-2 border-black bg-black p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition ease-in-out hover:cursor-pointer active:opacity-55 dark:border-gray-600 dark:bg-gray-800"
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          <AnimatePresence mode="wait">
            {darkModeState ? (
              <>
                <motion.span
                  key="darkModeIcon"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
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
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <IoSunnyOutline className="h-4 w-4 text-white" />
                </motion.span>
              </>
            )}
          </AnimatePresence>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
