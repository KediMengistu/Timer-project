import { AnimatePresence, motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetSignin,
  SignInDTO,
  submitSignIn,
} from "../../features/auth/siginSlice";
import { setSignedInStatus } from "../../features/auth/signedinStatusSlice";

function SignInForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const submitSigninState = useAppSelector((state) => state.signin.status);
  const submitSigninErrorState = useAppSelector((state) => state.signin.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [proceedToVerify, setProceedToVerify] = useState(false);

  const handleForgotPasswordClick = () => {
    navigate("/forgotpassword");
  };

  const handleGoHomeClick = () => {
    navigate("/");
  };

  useEffect(() => {
    if (submitSigninState === "succeeded") {
      dispatch(resetSignin());
      dispatch(setSignedInStatus(true));
      navigate("/manage-timers");
    }
  }, [submitSigninState]);

  useEffect(() => {
    if (proceedToVerify) {
      dispatch(resetSignin());
      navigate("/verify-user-from-signin");
    }
  }, [proceedToVerify]);

  useEffect(() => {
    return () => {
      dispatch(resetSignin());
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="relative grid h-48 w-64 grid-rows-[auto_1fr] gap-1 rounded-2xl border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
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
            <div className="pointer-events-none absolute top-1/2 right-[110%] flex w-[55px] -translate-y-1/2 items-center justify-center rounded-tr-full rounded-br-full border-2 border-black bg-white p-1! opacity-0 transition duration-200 ease-in-out peer-hover:opacity-100 md:w-[70px] dark:border-gray-700 dark:bg-gray-800">
              <h1 className="text-center text-[10px] text-black italic md:text-xs dark:text-white">
                Go Home
              </h1>
            </div>
          </div>
          <h1 className="text-center text-xs text-black italic dark:text-white">
            Welcome Back &#183; Sign In
          </h1>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const signInDTO: SignInDTO = {
              email,
              password,
            };
            dispatch(submitSignIn(signInDTO));
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
                value={email}
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-1">
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
            <button
              type="button"
              onClick={handleForgotPasswordClick}
              className="flex flex-row items-center justify-center rounded-sm border-2 border-black bg-black p-2! shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition ease-in-out hover:cursor-pointer active:opacity-55 dark:border-gray-600 dark:bg-gray-700"
            >
              <h1 className="text-center text-xs text-white">
                Forgot Password
              </h1>
            </button>
          </div>
        </form>

        {/* Error display positioned relative to the parent motion div */}
        <AnimatePresence mode="wait">
          {submitSigninErrorState !== null && (
            <motion.div
              key={`signupAPIErrorDiv-${JSON.stringify(submitSigninErrorState)}`}
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
                {Array.isArray(submitSigninErrorState.message)
                  ? submitSigninErrorState.message.join(" ")
                  : submitSigninErrorState.message}
                {submitSigninErrorState.message ===
                "Associated user account is not verified." ? (
                  <>
                    {" "}
                    <span
                      onClick={() => {
                        setProceedToVerify(true);
                      }}
                      className="text-blue-600 underline underline-offset-2 transition ease-in-out hover:cursor-pointer active:opacity-55 dark:text-yellow-500"
                    >
                      Click here to verify account.
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default SignInForm;
