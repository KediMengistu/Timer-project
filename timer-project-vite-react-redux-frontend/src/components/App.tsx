import { Outlet } from "react-router";
import { useAppSelector } from "../app/hooks";
import { useEffect } from "react";

function App() {
  const darkModeState = useAppSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkModeState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkModeState]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
