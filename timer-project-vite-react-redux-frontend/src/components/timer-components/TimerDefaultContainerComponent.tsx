import { AnimatePresence, motion } from "motion/react";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetUserError,
  resetUserStatus,
  retrieveUser,
} from "../../features/user/userSlice";
import {
  resetTimersError,
  resetTimersStatus,
  retrieveAllTimers,
} from "../../features/timers/timersSlice";

function TimerDefaultContainerComponent() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user.user);
  const timersState = useAppSelector((state) => state.timers.allTimers);
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-TimerDefaultContainerComponent`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="grid h-full w-full flex-1 grid-rows-1 rounded-lg border-2 border-black bg-white pt-4! pb-4! dark:border-gray-700 dark:bg-gray-800"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

export default TimerDefaultContainerComponent;
