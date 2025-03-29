import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router";
import { MdEmail } from "react-icons/md";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  ApiErrorResponse,
  ReinitiateVerificationDTO,
} from "../../app/appTypes";
import {
  reinitiateForgotPasswordVerification,
  resetUser,
  submitForgotPassword,
} from "../../features/user/userSlice";
import { ForgotPasswordDTO } from "../../features/user/userDTO";

function ForgotPasswordForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const submitForgotPasswordState = useAppSelector(
    (state) => state.user.status,
  );
  const submitForgotPasswordErrorState = useAppSelector(
    (state) => state.user.error,
  );
  const [email, setEmail] = useState("");
  const [nonAPIError, setNonAPIError] = useState<ApiErrorResponse | null>(null);

  const handleGoHomeClick = () => {
    navigate("/");
  };

  useEffect(() => {
    if (
      submitForgotPasswordState === "succeeded" ||
      (submitForgotPasswordErrorState !== null &&
        submitForgotPasswordErrorState.message ===
          "A verification code has already been sent. Please check your email.")
    ) {
      dispatch(resetUser());
      navigate("/verify-user-forgot-password", { replace: true });
    }
  }, [submitForgotPasswordState, submitForgotPasswordErrorState]);

  useEffect(() => {
    return () => {
      dispatch(resetUser());
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-ForgotPasswordFormComponent`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="grid h-36 w-64 grid-rows-[auto_1fr] gap-1 rounded-2xl border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
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
            <div className="pointer-events-none absolute top-1/2 right-[110%] flex w-[70px] -translate-y-1/2 items-center justify-center rounded-tr-full rounded-br-full border-2 border-black bg-white p-1! opacity-0 shadow-[-2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition duration-200 ease-in-out peer-hover:opacity-100 dark:border-gray-700 dark:bg-gray-800">
              <h1 className="text-center text-xs text-black italic dark:text-white">
                Go Home
              </h1>
            </div>
          </div>
          <h1 className="text-center text-xs text-black italic dark:text-white">
            Let's Fix This &#183; Forgot Password
          </h1>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (nonAPIError) {
              setNonAPIError(null);
            }
            const forgotPasswordDTO: ForgotPasswordDTO = {
              email,
            };
            dispatch(submitForgotPassword(forgotPasswordDTO));
          }}
          className="grid grid-rows-[1fr_auto] gap-1"
        >
          <div className="grid grid-rows-1">
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
          </div>
          <div className="flex flex-row items-center justify-center p-1!">
            <button
              type="submit"
              className="group flex flex-row items-center justify-center rounded-full border-2 border-white bg-white p-2! shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition ease-in-out hover:cursor-pointer hover:border-black hover:bg-black active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
            >
              <h1 className="text-center text-xs text-black group-hover:text-white dark:text-white">
                Submit
              </h1>
            </button>
          </div>
        </form>
        <AnimatePresence mode="wait">
          {nonAPIError !== null ? (
            <motion.div
              key={`nonAPIErrorForgotPasswordDiv-${JSON.stringify(nonAPIError)}`}
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
                <br />
                <span
                  onClick={() => {
                    if (email !== "") {
                      setNonAPIError(null);
                      const reinitiateVerificationForgotPasswordDTO: ReinitiateVerificationDTO =
                        {
                          email,
                          verificationAction: "forgot password verification",
                        };
                      dispatch(
                        reinitiateForgotPasswordVerification(
                          reinitiateVerificationForgotPasswordDTO,
                        ),
                      );
                    } else {
                      const error: ApiErrorResponse = {
                        timestamp: new Date().toISOString(),
                        path: location.pathname,
                        message: "Email must be provided for password reset.",
                        statusCode: 400,
                      };
                      setNonAPIError(error);
                    }
                  }}
                  className="text-blue-600 underline underline-offset-2 transition ease-in-out hover:cursor-pointer active:opacity-55 dark:text-yellow-500"
                >
                  Click here to verify again.
                </span>
              </h1>
            </motion.div>
          ) : submitForgotPasswordErrorState !== null ? (
            <motion.div
              key={`APIErrorForgotPasswordDiv-${JSON.stringify(submitForgotPasswordErrorState)}`}
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
                {Array.isArray(submitForgotPasswordErrorState.message) ? (
                  <>{submitForgotPasswordErrorState.message.join(" ")}</>
                ) : (
                  <>
                    {submitForgotPasswordErrorState.message ===
                      `Verification code has expired. Please request a new one.` ||
                    submitForgotPasswordErrorState.message ===
                      `Previous verification has expired. You can now proceed.` ? (
                      <>
                        Previous verification code has expired.
                        <br />
                        <span
                          onClick={() => {
                            if (email !== "") {
                              const reinitiateVerificationForgotPasswordDTO: ReinitiateVerificationDTO =
                                {
                                  email,
                                  verificationAction:
                                    "forgot password verification",
                                };
                              dispatch(
                                reinitiateForgotPasswordVerification(
                                  reinitiateVerificationForgotPasswordDTO,
                                ),
                              );
                            } else {
                              const error: ApiErrorResponse = {
                                timestamp: new Date().toISOString(),
                                path: location.pathname,
                                message:
                                  "Email must be provided for password reset.",
                                statusCode: 400,
                              };
                              setNonAPIError(error);
                            }
                          }}
                          className="text-blue-600 underline underline-offset-2 transition ease-in-out hover:cursor-pointer active:opacity-55 dark:text-yellow-500"
                        >
                          Click here to get new code.
                        </span>
                      </>
                    ) : (
                      <>{submitForgotPasswordErrorState.message}</>
                    )}
                  </>
                )}
              </h1>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default ForgotPasswordForm;
