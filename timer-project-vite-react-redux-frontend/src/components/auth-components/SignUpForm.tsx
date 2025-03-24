import { AnimatePresence, motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import { RiUser3Fill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { resetAuth, submitSignUp } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ApiErrorResponse } from "../../app/appTypes";
import { SignUpDTO } from "../../features/auth/authDTO";

function SignUpForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const submitSignupState = useAppSelector((state) => state.auth.status);
  const submitSignupErrorState = useAppSelector((state) => state.auth.error);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [nonAPIError, setNonAPIError] = useState<ApiErrorResponse | null>(null);

  const handleGoHomeClick = () => {
    navigate("/");
  };

  useEffect(() => {
    if (submitSignupState === "succeeded") {
      dispatch(resetAuth());
      navigate("/verify-user-from-signup", { replace: true });
    }
  }, [submitSignupState]);

  useEffect(() => {
    return () => {
      dispatch(resetAuth());
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-SignUpFormComponent`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="relative grid h-72 w-64 grid-rows-[auto_1fr] gap-1 rounded-2xl border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="relative flex items-center justify-center border-b-2 border-black p-2! dark:border-gray-700">
          <div className="absolute top-1/2 left-2 flex -translate-y-1/2 items-center justify-center">
            <button
              type="button"
              onClick={handleGoHomeClick}
              className="peer cursor-pointer border-0 bg-transparent p-0 transition ease-in-out hover:opacity-55"
            >
              <FaCircleArrowLeft />
            </button>
            <div className="pointer-events-none absolute top-1/2 right-[110%] flex w-[55px] -translate-y-1/2 items-center justify-center rounded-tr-full rounded-br-full border-2 border-black bg-white p-1! opacity-0 shadow-[-2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition duration-200 ease-in-out peer-hover:opacity-100 md:w-[70px] dark:border-gray-700 dark:bg-gray-800">
              <h1 className="text-center text-[10px] text-black italic md:text-xs dark:text-white">
                Go Home
              </h1>
            </div>
          </div>
          <h1 className="text-center text-xs text-black italic dark:text-white">
            Welcome &#183; Create Account
          </h1>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (password === confirmPassword) {
              setNonAPIError(null);
              const signupDTO: SignUpDTO = {
                email,
                password,
                firstName: firstname,
                lastName: lastname,
              };
              dispatch(submitSignUp(signupDTO));
            } else {
              const error: ApiErrorResponse = {
                timestamp: new Date().toISOString(),
                path: location.pathname,
                message: "Password entries do not match.",
                statusCode: 400,
              };
              setNonAPIError(error);
            }
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
                value={firstname}
                required
                onChange={(event) => {
                  setFirstname(event.target.value);
                }}
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
              <div className="relative flex items-center justify-center p-2!">
                <IoIosInformationCircleOutline className="peer hover:cursor-pointer" />

                <div className="pointer-events-none absolute top-1/2 left-0 flex h-auto w-[75px] -translate-y-1/2 flex-row items-center justify-center rounded-tl-full rounded-bl-full border-2 border-black bg-white p-1! opacity-0 shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition duration-200 ease-in-out peer-hover:opacity-100 md:left-full dark:border-gray-700 dark:bg-gray-800">
                  <h1 className="text-center text-[8px] text-black md:text-[9px] dark:text-white">
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
                value={lastname}
                required
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
              <div className="relative flex items-center justify-center p-2!">
                <IoIosInformationCircleOutline className="peer hover:cursor-pointer" />

                <div className="pointer-events-none absolute top-1/2 left-0 flex h-auto w-[75px] -translate-y-1/2 flex-row items-center justify-center rounded-tl-full rounded-bl-full border-2 border-black bg-white p-1! opacity-0 shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition duration-200 ease-in-out peer-hover:opacity-100 md:left-full dark:border-gray-700 dark:bg-gray-800">
                  <h1 className="text-center text-[8px] text-black md:text-[9px] dark:text-white">
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
                value={email}
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
              <div className="relative flex items-center justify-center p-2!">
                <IoIosInformationCircleOutline className="peer hover:cursor-pointer" />

                <div className="pointer-events-none absolute top-1/2 left-0 flex h-auto w-[75px] -translate-y-1/2 flex-row items-center justify-center rounded-tl-full rounded-bl-full border-2 border-black bg-white p-1! opacity-0 shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition duration-200 ease-in-out peer-hover:opacity-100 md:left-full dark:border-gray-700 dark:bg-gray-800">
                  <h1 className="text-center text-[8px] text-black md:text-[9px] dark:text-white">
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
                value={password}
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
              <div className="relative flex items-center justify-center p-2!">
                <IoIosInformationCircleOutline className="peer hover:cursor-pointer" />

                <div className="pointer-events-none absolute top-1/2 left-0 flex h-auto w-[75px] -translate-y-1/2 flex-row items-center justify-center rounded-tl-full rounded-bl-full border-2 border-black bg-white p-1! opacity-0 shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition duration-200 ease-in-out peer-hover:opacity-100 md:left-full dark:border-gray-700 dark:bg-gray-800">
                  <h1 className="text-center text-[8px] text-black md:text-[9px] dark:text-white">
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
                value={confirmPassword}
                required
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
              <div className="relative flex items-center justify-center p-2!">
                <IoIosInformationCircleOutline className="peer hover:cursor-pointer" />

                <div className="pointer-events-none absolute top-1/2 left-0 flex h-auto w-[75px] -translate-y-1/2 flex-row items-center justify-center rounded-tl-full rounded-bl-full border-2 border-black bg-white p-1! opacity-0 shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition duration-200 ease-in-out peer-hover:opacity-100 md:left-full dark:border-gray-700 dark:bg-gray-800">
                  <h1 className="text-center text-[8px] text-black md:text-[9px] dark:text-white">
                    Must Be Same as Password.
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center p-1!">
            <button
              type="submit"
              className="group flex flex-row items-center justify-center rounded-full border-2 border-white bg-white p-2! shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition ease-in-out hover:cursor-pointer hover:border-black hover:bg-black active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
            >
              <h1 className="text-center text-xs text-black group-hover:text-white dark:text-white">
                Register
              </h1>
            </button>
          </div>
        </form>
        <AnimatePresence mode="wait">
          {nonAPIError !== null ? (
            <motion.div
              key={`nonAPIErrorSignUpDiv-${JSON.stringify(nonAPIError)}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
              className="absolute top-[98%] left-1/2 h-fit w-[150px] -translate-x-1/2 rounded-sm border-1 border-black bg-red-400 p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
            >
              <h1 className="text-center text-[8px] text-black md:text-[9px] dark:text-white">
                {nonAPIError.message}
              </h1>
            </motion.div>
          ) : submitSignupErrorState !== null ? (
            <motion.div
              key={`APIErrorSignUpDiv-${JSON.stringify(submitSignupErrorState)}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
              className="absolute top-[98%] left-1/2 h-fit w-[150px] -translate-x-1/2 rounded-sm border-1 border-black bg-red-400 p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
            >
              <h1 className="text-center text-[8px] text-black md:text-[9px] dark:text-white">
                {Array.isArray(submitSignupErrorState.message)
                  ? submitSignupErrorState.message.join(" ")
                  : submitSignupErrorState.message}
              </h1>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default SignUpForm;
