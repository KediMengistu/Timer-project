import { Outlet } from "react-router";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useEffect } from "react";
import { resetAuth, submitSignOut } from "../features/auth/authSlice";

function App() {
  const darkModeState = useAppSelector((state) => state.theme.darkMode);
  const timezoneState = useAppSelector((state) => state.time.timezone);
  const signedInState = useAppSelector((state) => state.auth.isSignedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (darkModeState) {
      document.documentElement.classList.add("dark");
      if (localStorage.getItem("theme") !== "dark") {
        localStorage.setItem("theme", "dark");
      }
    } else {
      document.documentElement.classList.remove("dark");
      if (localStorage.getItem("theme") !== "light") {
        localStorage.setItem("theme", "light");
      }
    }
  }, [darkModeState]);

  useEffect(() => {
    if (timezoneState) {
      if (localStorage.getItem("timezone") !== "UTC") {
        localStorage.setItem("timezone", "UTC");
      }
    } else {
      if (localStorage.getItem("timezone") !== "local") {
        localStorage.setItem("timezone", "local");
      }
    }
  }, [timezoneState]);

  useEffect(() => {
    if (signedInState === false) {
      dispatch(submitSignOut()).then(() => {
        dispatch(resetAuth());
      });
    }
  }, [signedInState]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
