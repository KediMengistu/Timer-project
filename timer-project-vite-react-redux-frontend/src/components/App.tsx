import { Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import { useEffect } from "react";

function App() {
  const timezoneState = useAppSelector((state) => state.time.timezone);
  const themeState = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    localStorage.setItem("timezone", timezoneState);
  }, [timezoneState]);

  useEffect(() => {
    if (themeState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [themeState]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
