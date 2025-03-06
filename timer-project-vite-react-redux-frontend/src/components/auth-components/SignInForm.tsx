import { AnimatePresence, motion } from "motion/react";
import { NavLink, useLocation } from "react-router";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useState } from "react";

function SignInForm() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="grid h-48 w-64 grid-rows-[auto_1fr] gap-1 rounded-2xl border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="relative flex items-center justify-center border-b-2 border-black p-2! dark:border-gray-700">
          <NavLink
            to="/"
            end
            style={({ isActive }) => {
              return isActive
                ? {
                    textDecoration: "none",
                  }
                : {
                    textDecoration: "none",
                  };
            }}
            className="absolute top-1/2 left-2 flex -translate-y-1/2 items-center justify-center"
          >
            <FaCircleArrowLeft className="peer transition ease-in-out hover:cursor-pointer hover:opacity-55"></FaCircleArrowLeft>
            <div className="pointer-events-none absolute top-1/2 right-[110%] flex w-[70px] -translate-y-1/2 items-center justify-center rounded-tr-full rounded-br-full border-2 border-black bg-white p-1! opacity-0 transition duration-200 ease-in-out peer-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800">
              <h1 className="text-center text-xs text-black italic dark:text-white">
                Go Home
              </h1>
            </div>
          </NavLink>
          <h1 className="text-center text-xs text-black italic dark:text-white">
            Welcome Back &#183; Sign In
          </h1>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="grid grid-rows-[1fr_auto] gap-1"
        >
          <div className="grid grid-rows-2 gap-1">
            <div className="grid grid-cols-[auto_1fr] gap-1">
              <label
                htmlFor="email"
                className="flex items-center justify-center p-2! hover:cursor-pointer"
              >
                <MdEmail />
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                autoComplete="off"
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] gap-1">
              <label
                htmlFor="password"
                className="flex items-center justify-center p-2! hover:cursor-pointer"
              >
                <RiLockPasswordFill />
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="off"
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-end gap-1 p-1!">
            <button
              type="submit"
              className="group flex flex-row items-center justify-center rounded-full border-2 border-white bg-white p-2! shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition ease-in-out hover:cursor-pointer hover:border-black hover:bg-black active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
            >
              <h1 className="text-center text-xs text-black group-hover:text-white dark:text-white">
                Sign In
              </h1>
            </button>
            <NavLink
              to="/forgotpassword"
              end
              style={({ isActive }) => {
                return isActive
                  ? {
                      textDecoration: "none",
                    }
                  : {
                      textDecoration: "none",
                    };
              }}
              type="submit"
              className="flex flex-row items-center justify-center rounded-sm border-2 border-black bg-black p-2! shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition ease-in-out hover:cursor-pointer active:opacity-55 dark:border-gray-600 dark:bg-gray-700"
            >
              <h1 className="text-center text-xs text-white">
                Forgot Password
              </h1>
            </NavLink>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

export default SignInForm;
