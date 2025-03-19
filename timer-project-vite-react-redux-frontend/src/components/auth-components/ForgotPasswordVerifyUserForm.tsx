import { AnimatePresence, motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  ClipboardEvent,
  useCallback,
} from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  reinitiateForgotPasswordVerification,
  ReinitiateForgotPasswordDTO,
  resetForgotPassword,
  verifyForgotPassword,
  VerifyForgotPasswordDTO,
} from "../../features/auth/forgotPasswordSlice";
import { ApiErrorResponse } from "../../app/appTypes";

function ForgotPasswordUserVerifyForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const verifyForgotPasswordState = useAppSelector(
    (state) => state.forgotPassword.status,
  );
  const verifyForgotPasswordErrorState = useAppSelector(
    (state) => state.forgotPassword.error,
  );
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [sentReInitiateVerification, setSentReinitiateVerification] =
    useState<boolean>(false);
  const [refsInitialized, setRefsInitialized] = useState<boolean>(false);
  const [nonAPIError, setNonAPIError] = useState<ApiErrorResponse | null>(null);

  useEffect(() => {
    if (
      verifyForgotPasswordState === "succeeded" &&
      sentReInitiateVerification
    ) {
      setSentReinitiateVerification(false);
      dispatch(resetForgotPassword());
    } else if (
      verifyForgotPasswordState === "succeeded" &&
      !sentReInitiateVerification
    ) {
      dispatch(resetForgotPassword());
      navigate("/signin");
    }
  }, [verifyForgotPasswordState]);

  useEffect(() => {
    return () => {
      dispatch(resetForgotPassword());
    };
  }, []);

  // Create a ref array for the verification code inputs
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize the refs array
  useEffect(() => {
    // Pre-populate with nulls to match the expected length
    codeInputRefs.current = Array(6).fill(null);
    setRefsInitialized(true);
  }, []);

  // State to hold verification code values
  const [codeValues, setCodeValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Create a stable callback for ref assignment
  const setInputRef = useCallback(
    (element: HTMLInputElement | null, index: number) => {
      codeInputRefs.current[index] = element;
    },
    [],
  );

  // Function to handle label click to focus on the first empty input
  const handleCodeLabelClick = (): void => {
    // Find the index of the first empty input
    const firstEmptyIndex = codeValues.findIndex((value) => value === "");

    // If all inputs are filled, focus on the last one
    const indexToFocus = firstEmptyIndex === -1 ? 5 : firstEmptyIndex;

    // Focus on the input
    const inputToFocus = codeInputRefs.current[indexToFocus];
    if (inputToFocus) {
      inputToFocus.focus();
    }
  };

  // Function to handle input changes and auto-advance
  const handleCodeChange = (index: number, value: string): void => {
    // Create a new array with the updated value
    const newCodeValues = [...codeValues];

    // Only accept single characters and numbers/letters
    if (value.length <= 1 && (/^[a-zA-Z0-9]$/.test(value) || value === "")) {
      newCodeValues[index] = value;
      setCodeValues(newCodeValues);

      // Auto-advance to the next field if a character was entered
      if (value !== "" && index < 5) {
        // Small delay to ensure DOM has updated
        setTimeout(() => {
          const nextInput = codeInputRefs.current[index + 1];
          if (nextInput) {
            nextInput.focus();
          }
        }, 0);
      }
    }
  };

  // Handle key press for navigation and backspace
  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ): void => {
    // If backspace is pressed and the field is empty, focus on the previous field
    if (event.key === "Backspace" && codeValues[index] === "" && index > 0) {
      const prevInput = codeInputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }

    // Arrow key navigation between inputs
    if (event.key === "ArrowLeft" && index > 0) {
      const prevInput = codeInputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }

    if (event.key === "ArrowRight" && index < 5) {
      const nextInput = codeInputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle paste functionality for the entire code
  const handlePaste = (event: ClipboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").trim();

    // If pasted data matches expected format, fill all inputs
    if (/^[a-zA-Z0-9]{6}$/.test(pastedData)) {
      const newCodeValues = pastedData.split("");
      setCodeValues(newCodeValues);

      // Focus on the last input after successful paste
      setTimeout(() => {
        const lastInput = codeInputRefs.current[5];
        if (lastInput) {
          lastInput.focus();
        }
      }, 0);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="relative grid h-72 w-64 grid-rows-[auto_1fr] gap-1 rounded-2xl border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex items-center justify-center border-b-2 border-black p-2! dark:border-gray-700">
          <h1 className="text-center text-xs text-black italic dark:text-white">
            Password Reset &#183; Verification
          </h1>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (nonAPIError) {
              setNonAPIError(null);
            }
            if (newPassword === confirmNewPassword) {
              setNonAPIError(null);
              const verifyForgotPasswordDTO: VerifyForgotPasswordDTO = {
                email,
                inputVerificationCode: codeValues.join(""),
                newPassword,
              };
              dispatch(verifyForgotPassword(verifyForgotPasswordDTO));
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
          <div className="grid grid-rows-4 gap-1">
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
                onChange={(event) => setEmail(event.target.value)}
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
            </div>
            <div className="grid grid-cols-[auto_1fr_auto] gap-1">
              <label
                htmlFor="newPassword"
                className="flex items-center justify-center p-2! hover:cursor-pointer"
              >
                <RiLockPasswordFill />
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
                autoComplete="off"
                value={newPassword}
                required
                onChange={(event) => setNewPassword(event.target.value)}
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
                htmlFor="confirmNewPassword"
                className="flex items-center justify-center p-2! hover:cursor-pointer"
              >
                <RiLockPasswordFill />
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder="Confirm New Password"
                autoComplete="off"
                value={confirmNewPassword}
                required
                onChange={(event) => setConfirmNewPassword(event.target.value)}
                className="border-b-2 border-black text-xs outline-0 dark:border-gray-700"
              />
              <div className="relative flex items-center justify-center p-2!">
                <IoIosInformationCircleOutline className="peer hover:cursor-pointer" />
                <div className="pointer-events-none absolute top-1/2 left-0 flex h-auto w-[75px] -translate-y-1/2 flex-row items-center justify-center rounded-tl-full rounded-bl-full border-2 border-black bg-white p-1! opacity-0 shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] transition duration-200 ease-in-out peer-hover:opacity-100 md:left-full dark:border-gray-700 dark:bg-gray-800">
                  <h1 className="text-center text-[8px] text-black md:text-[9px] dark:text-white">
                    Same as New Password.
                  </h1>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] border-black p-1! dark:border-gray-700">
              <label
                htmlFor="code-0"
                className="flex items-center justify-center p-2! hover:cursor-pointer"
                onClick={handleCodeLabelClick}
              >
                <h1 className="text-xs text-black dark:text-white">Code:</h1>
              </label>
              <div className="grid grid-cols-6 gap-1 p-1!">
                {codeValues.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`code-${index}`}
                    id={`code-${index}`}
                    ref={(element) => setInputRef(element, index)}
                    value={value}
                    maxLength={1}
                    autoComplete="off"
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleCodeChange(index, event.target.value)
                    }
                    onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
                      handleKeyDown(index, event)
                    }
                    onPaste={(event: ClipboardEvent<HTMLInputElement>) =>
                      handlePaste(event)
                    }
                    className={`rounded-xs border-2 border-black text-center text-xs shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] outline-0 transition-colors duration-200 ${value ? "bg-black text-white dark:bg-gray-700" : "bg-white text-black dark:bg-gray-800 dark:text-white"} dark:border-gray-700`}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-rows flex items-center justify-center gap-1 pb-1!">
            <button
              type="submit"
              className="group flex flex-row items-center justify-center rounded-full border-2 border-white bg-white p-2! shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition ease-in-out hover:cursor-pointer hover:border-black hover:bg-black active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
            >
              <h1 className="text-center text-xs text-black group-hover:text-white dark:text-white">
                Reset Password
              </h1>
            </button>
          </div>
        </form>
        <AnimatePresence mode="wait">
          {nonAPIError !== null ? (
            <motion.div
              key={`nonAPIErrorVerifyForgotPasswordDiv-${JSON.stringify(nonAPIError)}`}
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
                {nonAPIError.message ===
                "Email must be provided for Account Verification." ? (
                  <>
                    {nonAPIError.message}
                    <br />
                    <span
                      onClick={() => {
                        if (email !== "") {
                          setNonAPIError(null);
                          const reinitiateForgotPasswordDTO: ReinitiateForgotPasswordDTO =
                            {
                              email,
                              verificationAction:
                                "forgot password verification",
                            };
                          setSentReinitiateVerification(true);
                          dispatch(
                            reinitiateForgotPasswordVerification(
                              reinitiateForgotPasswordDTO,
                            ),
                          );
                        } else {
                          const error: ApiErrorResponse = {
                            timestamp: new Date().toISOString(),
                            path: location.pathname,
                            message:
                              "Email must be provided for Account Verification.",
                            statusCode: 400,
                          };
                          setNonAPIError(error);
                        }
                      }}
                      className="text-blue-600 underline underline-offset-2 transition ease-in-out hover:cursor-pointer active:opacity-55 dark:text-yellow-500"
                    >
                      Click here to verify again.
                    </span>
                  </>
                ) : (
                  <>{nonAPIError.message}</>
                )}
              </h1>
            </motion.div>
          ) : verifyForgotPasswordErrorState !== null ? (
            <motion.div
              key={`APIErrorVerifyForgotPasswordDiv-${JSON.stringify(verifyForgotPasswordErrorState)}`}
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
                {Array.isArray(verifyForgotPasswordErrorState.message) ? (
                  <>{verifyForgotPasswordErrorState.message.join(" ")}</>
                ) : (
                  <>
                    {verifyForgotPasswordErrorState.message ===
                      `Verification code has expired. Please request a new one.` ||
                    verifyForgotPasswordErrorState.message ===
                      `Previous verification has expired. You can now proceed.` ? (
                      <>
                        Previous verification code has expired.
                        <br />
                        <span
                          onClick={() => {
                            if (email !== "") {
                              setNonAPIError(null);
                              const reinitiateForgotPasswordDTO: ReinitiateForgotPasswordDTO =
                                {
                                  email,
                                  verificationAction:
                                    "forgot password verification",
                                };
                              setSentReinitiateVerification(true);
                              dispatch(
                                reinitiateForgotPasswordVerification(
                                  reinitiateForgotPasswordDTO,
                                ),
                              );
                            } else {
                              const error: ApiErrorResponse = {
                                timestamp: new Date().toISOString(),
                                path: location.pathname,
                                message:
                                  "Email must be provided for Account Verification.",
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
                      <>{verifyForgotPasswordErrorState.message}</>
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

export default ForgotPasswordUserVerifyForm;
