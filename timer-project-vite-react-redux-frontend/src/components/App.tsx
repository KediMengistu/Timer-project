import { Outlet } from "react-router";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useEffect } from "react";
import {
  clearSignedInStatus,
  resetClearSignedInStatus,
} from "../features/auth/signedinStatusSlice";

function App() {
  const darkModeState = useAppSelector((state) => state.theme.darkMode);
  const timezoneState = useAppSelector((state) => state.time.timezone);
  const signedInState = useAppSelector((state) => state.signedInStatus.value);
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
    if (signedInState) {
      if (localStorage.getItem("signedInStatus") !== "signed in") {
        localStorage.setItem("signedInStatus", "signed in");
      }
    } else {
      dispatch(clearSignedInStatus()).then(() => {
        dispatch(resetClearSignedInStatus());
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
