import { Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import { useEffect } from "react";

function App() {
  const darkModeState = useAppSelector((state) => state.theme.darkMode);
  const timezoneState = useAppSelector((state) => state.time.timezone);

  useEffect(() => {
    if (darkModeState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkModeState]);

  useEffect(() => {
    if (timezoneState) {
      localStorage.setItem("timezone", "UTC");
    } else {
      localStorage.setItem("timezone", "local");
    }
  }, [timezoneState]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
