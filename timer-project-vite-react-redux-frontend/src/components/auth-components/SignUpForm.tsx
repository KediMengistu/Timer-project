import { AnimatePresence, motion } from "motion/react";
import { NavLink, useLocation } from "react-router";
import { RiUser3Fill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";

function SignUpForm() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="grid h-72 w-64 grid-rows-[auto_1fr] gap-1 rounded-2xl border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
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
            <FaCircleArrowLeft className="transition ease-in-out hover:cursor-pointer hover:opacity-55"></FaCircleArrowLeft>
          </NavLink>
          <h1 className="text-center text-xs text-black italic dark:text-white">
            Welcome &#183; Create Account
          </h1>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="grid grid-rows-[1fr_auto] gap-1"
        >
          <div className="grid grid-rows-5 gap-1">
            <div className="grid grid-cols-[auto_1fr_auto] gap-1">
              <label
                htmlFor="firstname"
                className="flex items-center justify-center p-2! hover:cursor-pointer"
              >
                <RiUser3Fill></RiUser3Fill>
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First name"
                autoComplete="off"
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
              <div className="relative flex items-center justify-center p-2!">
                <IoIosInformationCircleOutline className="peer hover:cursor-pointer" />

                <div className="pointer-events-none absolute top-1/2 left-full flex h-auto w-[100px] -translate-y-1/2 rounded-tl-full rounded-bl-full border-2 border-black bg-white p-1! opacity-0 transition duration-200 ease-in-out peer-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800">
                  <h1 className="text-center text-xs text-black dark:text-white">
                    Must Not Be Empty.
                  </h1>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] gap-1">
              <label
                htmlFor="lastname"
                className="flex items-center justify-center p-2! hover:cursor-pointer"
              >
                <RiUser3Fill></RiUser3Fill>
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last name"
                autoComplete="off"
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
              <div className="relative flex items-center justify-center p-2!">
                <IoIosInformationCircleOutline className="peer hover:cursor-pointer" />

                <div className="pointer-events-none absolute top-1/2 left-full flex h-auto w-[100px] -translate-y-1/2 rounded-tl-full rounded-bl-full border-2 border-black bg-white p-1! opacity-0 transition duration-200 ease-in-out peer-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800">
                  <h1 className="text-center text-xs text-black dark:text-white">
                    Must Not Be Empty.
                  </h1>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] gap-1">
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
              <div className="relative flex items-center justify-center p-2!">
                <IoIosInformationCircleOutline className="peer hover:cursor-pointer" />

                <div className="pointer-events-none absolute top-1/2 left-full flex h-auto w-[100px] -translate-y-1/2 rounded-tl-full rounded-bl-full border-2 border-black bg-white p-1! opacity-0 transition duration-200 ease-in-out peer-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800">
                  <h1 className="text-center text-xs text-black dark:text-white">
                    Must Be Valid Email.
                  </h1>
                </div>
              </div>
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
              <div className="relative flex items-center justify-center p-2!">
                <IoIosInformationCircleOutline className="peer hover:cursor-pointer" />

                <div className="pointer-events-none absolute top-1/2 left-full flex h-auto w-[100px] -translate-y-1/2 rounded-tl-full rounded-bl-full border-2 border-black bg-white p-1! opacity-0 transition duration-200 ease-in-out peer-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800">
                  <h1 className="text-right text-xs text-black dark:text-white">
                    8+ char: 1+ UC, LC, #, Symbol.
                  </h1>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] gap-1">
              <label
                htmlFor="confirmPassword"
                className="flex items-center justify-center p-2! hover:cursor-pointer"
              >
                <RiLockPasswordFill />
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                autoComplete="off"
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
              <div className="relative flex items-center justify-center p-2!">
                <IoIosInformationCircleOutline className="peer hover:cursor-pointer" />

                <div className="pointer-events-none absolute top-1/2 left-full flex h-auto w-[100px] -translate-y-1/2 rounded-tl-full rounded-bl-full border-2 border-black bg-white p-1! opacity-0 transition duration-200 ease-in-out peer-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800">
                  <h1 className="text-center text-xs text-black dark:text-white">
                    Must Be Same as Password.
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center p-1!">
            <button
              type="submit"
              className="flex flex-row items-center justify-center rounded-full border-2 border-white bg-white p-2! shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition ease-in-out hover:cursor-pointer hover:border-black active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-white"
            >
              <h1 className="text-center text-xs text-black dark:text-white">
                Register
              </h1>
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

export default SignUpForm;
