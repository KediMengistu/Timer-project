import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  resetUser,
  resetUserError,
  resetUserStatus,
  retrieveUser,
} from "../../../features/user/userSlice";
import {
  resetTimers,
  resetTimersError,
  resetTimersStatus,
  retrieveAllTimers,
} from "../../../features/timers/timersSlice";
import { setIsSignedIn } from "../../../features/auth/authSlice";

function TimerDefaultContainerComponent() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user.user);
  const userErrorState = useAppSelector((state) => state.user.error);
  const timersState = useAppSelector((state) => state.timers);
  const timerErrorState = useAppSelector((state) => state.timers.error);

  useEffect(() => {
    if (!userState) {
      dispatch(retrieveUser()).then(() => {
        dispatch(resetUserStatus());
        dispatch(resetUserError());
      });
    }
    if (JSON.stringify(timersState.entities) === "{}") {
      dispatch(retrieveAllTimers()).then(() => {
        dispatch(resetTimersStatus());
        dispatch(resetTimersError());
      });
    }
  }, []);

  useEffect(() => {
    if (
      (userErrorState !== null && userErrorState.message === "Unauthorized") ||
      (timerErrorState !== null && timerErrorState.message === "Unauthorized")
    ) {
      dispatch(resetUser());
      dispatch(resetTimers());
      dispatch(setIsSignedIn(false));
      navigate("/");
    }
  }, [userErrorState, timerErrorState]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-TimerDefaultContainerComponent`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="relative grid h-full w-full flex-1 grid-rows-1 rounded-lg border-2 border-black bg-white pt-4! pb-4! dark:border-gray-700 dark:bg-gray-800"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

export default TimerDefaultContainerComponent;
