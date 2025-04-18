import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setIsSignedIn } from "../../features/auth/authSlice";
import { resetUser } from "../../features/user/userSlice";
import { resetTimers } from "../../features/timers/timersSlice";
import { resetBreaks } from "../../features/breaks/breaksSlice";

function SignOutForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signedInErrorState = useAppSelector((state) => state.auth.error);

  const handleGoHomeClick = () => {
    navigate("/");
  };

  const handleSignOut = () => {
    dispatch(resetUser());
    dispatch(resetTimers());
    dispatch(resetBreaks());
    dispatch(setIsSignedIn(false));
    navigate("/");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-SignOutFormComponent`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="grid h-36 w-64 grid-rows-[auto_1fr] gap-1 rounded-2xl border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="relative flex items-center justify-center border-b-2 border-black p-2! dark:border-gray-700">
          <div className="absolute top-1/2 left-2 flex -translate-y-1/2 items-center justify-center">
            <button
              type="button"
              onClick={handleGoHomeClick}
              className="peer cursor-pointer border-0 bg-transparent p-0 transition ease-in-out hover:opacity-55"
            >
              <FaCircleArrowLeft />
            </button>
            <div className="pointer-events-none absolute top-1/2 right-[110%] flex w-[70px] -translate-y-1/2 items-center justify-center rounded-tr-full rounded-br-full border-2 border-black bg-white p-1! opacity-0 shadow-[-2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition duration-200 ease-in-out peer-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800">
              <h1 className="text-center text-xs text-black italic dark:text-white">
                Go Home
              </h1>
            </div>
          </div>
          <h1 className="text-center text-xs text-black italic dark:text-white">
            Exit &#183; Sign Out
          </h1>
        </div>
        <div className="grid grid-rows-[1fr_auto] gap-1">
          <div className="flex items-center justify-center">
            <h1 className="text-center text-xs text-black dark:text-white">
              Are you sure you want to sign out?
            </h1>
          </div>
          <div className="flex flex-row items-center justify-center p-1!">
            <button
              type="button"
              onClick={handleSignOut}
              className="group flex flex-row items-center justify-center rounded-full border-2 border-white bg-white p-2! shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition ease-in-out hover:cursor-pointer hover:border-black hover:bg-black active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
            >
              <h1 className="text-center text-xs text-black group-hover:text-white dark:text-white">
                Sign Out
              </h1>
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {signedInErrorState !== null && (
            <motion.div
              key={`APISignOutErrorDiv-${JSON.stringify(signedInErrorState)}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
              className="absolute top-[98%] left-1/2 h-fit w-[150px] -translate-x-1/2 rounded-sm border-1 border-black bg-red-400 p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
            >
              <h1 className="text-center text-[8px] text-black md:text-[9px] dark:text-white">
                {Array.isArray(signedInErrorState.message)
                  ? signedInErrorState.message.join(" ")
                  : signedInErrorState.message}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default SignOutForm;
