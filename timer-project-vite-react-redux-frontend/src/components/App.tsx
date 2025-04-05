import { Outlet } from "react-router";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useEffect } from "react";
import { resetAuth, submitSignOut } from "../features/auth/authSlice";
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
  const darkModeState = useAppSelector((state) => state.theme.darkMode);
  const signedInState = useAppSelector((state) => state.auth.isSignedIn);
  const userState = useAppSelector((state) => state.user.user);
  const updateUserState = useAppSelector((state) => state.user.updateUser);
  const timersState = useAppSelector((state) => state.timers);
  const fetchBreaksState = useAppSelector((state) => state.breaks.fetchBreaks);
  const breaksState = useAppSelector((state) => state.breaks);
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

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
