import { Outlet } from "react-router";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useEffect } from "react";
import {
  resetAuth,
  setIsSignedIn,
  submitSignOut,
} from "../features/auth/authSlice";
import {
  resetUpdateUser,
  resetUserError,
  resetUserStatus,
  retrieveUser,
} from "../features/user/userSlice";
import {
  resetTimersError,
  resetTimersStatus,
  retrieveAllTimers,
} from "../features/timers/timersSlice";
import {
  resetBreaksError,
  resetBreaksStatus,
  retrieveAllBreaks,
  setFetchBreaks,
} from "../features/breaks/breaksSlice";

function App() {
  //Theme trackers
  const darkModeState = useAppSelector((state) => state.theme.darkMode);
  //Auth Trackers
  const signedInState = useAppSelector((state) => state.auth.isSignedIn);
  //User Trackers
  const userState = useAppSelector((state) => state.user.user);
  const updateUserState = useAppSelector((state) => state.user.updateUser);
  //Timer trackers
  const timersState = useAppSelector((state) => state.timers);
  //Break trackers
  const fetchBreaksState = useAppSelector((state) => state.breaks.fetchBreaks);
  const breaksState = useAppSelector((state) => state.breaks);
  //Error trackers
  const authStateError = useAppSelector((state) => state.auth.error);
  const userStateError = useAppSelector((state) => state.user.error);
  const timersStateError = useAppSelector((state) => state.timers.error);
  const breaksStateError = useAppSelector((state) => state.breaks.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (darkModeState) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkModeState]);

  useEffect(() => {
    if (signedInState === true) {
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
    }
    if (signedInState === false) {
      dispatch(submitSignOut()).then(() => {
        dispatch(resetAuth());
      });
    }
  }, [signedInState]);

  useEffect(() => {
    if (signedInState === true) {
      if (updateUserState) {
        dispatch(retrieveUser()).then(() => {
          dispatch(resetUserStatus());
          dispatch(resetUserError());
          dispatch(resetUpdateUser());
        });
      }
    }
  }, [updateUserState]);

  useEffect(() => {
    if (fetchBreaksState) {
      if (JSON.stringify(breaksState.entities) === "{}") {
        timersState.ids.forEach((id) => {
          dispatch(retrieveAllBreaks(id)).then(() => {
            dispatch(resetBreaksStatus());
            dispatch(resetBreaksError());
          });
        });
      }
      dispatch(setFetchBreaks(false));
    }
  }, [fetchBreaksState]);

  useEffect(() => {
    if (
      (authStateError !== null && authStateError.message === "Unauthorized") ||
      (userStateError !== null && userStateError.message === "Unauthorized") ||
      (timersStateError !== null &&
        timersStateError.message === "Unauthorized") ||
      (breaksStateError !== null && breaksStateError.message === "Unauthorized")
    ) {
      dispatch(setIsSignedIn(false));
    }
    if (
      (authStateError !== null &&
        authStateError.message === "Required data not available") ||
      (userStateError !== null &&
        userStateError.message === "Required data not available") ||
      (timersStateError !== null &&
        timersStateError.message === "Required data not available") ||
      (breaksStateError !== null &&
        breaksStateError.message === "Required data not available")
    ) {
      window.location.href = "/";
    }
  }, [authStateError, userStateError, timersStateError, breaksStateError]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
