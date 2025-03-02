import { Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import { useEffect } from "react";

function App() {
  const locationState = useAppSelector((state) => state.location.value);
  const themeState = useAppSelector((state) => state.theme.value);

  useEffect(() => {
    if (localStorage.getItem("location") === null) {
      localStorage.setItem("location", JSON.stringify(false));
    } else {
      localStorage.setItem("location", JSON.stringify(locationState));
    }
  }, [locationState]);

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
