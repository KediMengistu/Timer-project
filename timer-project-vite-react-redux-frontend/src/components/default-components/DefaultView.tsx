import Navbar from "./Navbar";
import { Outlet } from "react-router";

function DefaultView() {
  return (
    <>
      <div className="grid grid-cols-none grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] md:grid-rows-none dark:bg-gray-900 dark:text-white">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}

export default DefaultView;
