import { AnimatePresence, motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setIsSignedIn } from "../../features/auth/authSlice";
import {
  reinitiateDeleteAccountVerification,
  resetUser,
  resetUserError,
  resetUserStatus,
  retrieveUser,
  submitDeleteAccount,
} from "../../features/user/userSlice";
import {
  ApiErrorResponse,
  ReinitiateVerificationDTO,
} from "../../app/appTypes";

function DeleteAccountForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const deleteAccountState = useAppSelector((state) => state.user.status);
  const deleteAccountErrorState = useAppSelector((state) => state.user.error);
  const userState = useAppSelector((state) => state.user.user);
  const [noEmailAPIError, setNoEmailAPIError] =
    useState<ApiErrorResponse | null>(null);
  const [sentDelete, setSentDelete] = useState<boolean>(false);

  const handleGoHomeClick = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!userState) {
      dispatch(retrieveUser()).then(() => {
        dispatch(resetUserStatus());
        dispatch(resetUserError());
      });
    }
  }, []);

  useEffect(() => {
    if (
      sentDelete &&
      (deleteAccountState === "succeeded" ||
        (deleteAccountErrorState !== null &&
          deleteAccountErrorState?.message ===
            "A verification code has already been sent. Please check your email."))
    ) {
      dispatch(resetUserStatus());
      dispatch(resetUserError());
      navigate("/verify-delete-account", { replace: true });
    }
  }, [deleteAccountState, deleteAccountErrorState, sentDelete]);

  useEffect(() => {
    if (
      deleteAccountErrorState !== null &&
      deleteAccountErrorState.message === "Unauthorized"
    ) {
      dispatch(resetUser());
      dispatch(setIsSignedIn(false));
      navigate("/");
    }
  }, [deleteAccountErrorState]);

  useEffect(() => {
    return () => {
      dispatch(resetUserStatus());
      dispatch(resetUserError());
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
        className="grid h-32 w-64 grid-rows-[auto_1fr] gap-1 rounded-2xl border-2 border-black bg-white p-2! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800"
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
            Account &#183; Delete Account
          </h1>
        </div>
        <div className="grid grid-rows-1">
          <div className="flex flex-row items-center justify-center p-1!">
            <button
              type="button"
              onClick={() => {
                if (noEmailAPIError) {
                  setNoEmailAPIError(null);
                }
                setSentDelete(true);
                dispatch(submitDeleteAccount());
              }}
              className="group flex flex-row items-center justify-center rounded-full border-2 border-white bg-white p-2! shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition ease-in-out hover:cursor-pointer hover:border-red-500 hover:bg-red-500 active:opacity-55 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-red-500 dark:hover:bg-red-500"
            >
              <h1 className="text-center text-xs text-black group-hover:text-white dark:text-white">
                Proceed to Delete Account Verification
              </h1>
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {noEmailAPIError !== null ? (
            <motion.div
              key={`noEmailAPIErrorDeleteAccountDiv-${JSON.stringify(noEmailAPIError)}`}
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
                {noEmailAPIError.message}
                <br />
                <span className="text-blue-600 underline underline-offset-2 transition ease-in-out hover:cursor-pointer active:opacity-55 dark:text-yellow-500">
                  Refresh browser or sign out, in and retry.
                </span>
              </h1>
            </motion.div>
          ) : (
            deleteAccountErrorState !== null && (
              <motion.div
                key={`APIErrorDeleteAccountDiv-${JSON.stringify(deleteAccountErrorState)}`}
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
                  {Array.isArray(deleteAccountErrorState.message) ? (
                    <>{deleteAccountErrorState.message.join(" ")}</>
                  ) : (
                    <>
                      {deleteAccountErrorState.message ===
                        `Verification code has expired. Please request a new one.` ||
                      deleteAccountErrorState.message ===
                        `Previous verification has expired. You can now proceed.` ? (
                        <>
                          Previous verification code has expired.
                          <br />
                          <span
                            onClick={() => {
                              if (userState !== null) {
                                const reinitiateDeleteAccountVerificationDTO: ReinitiateVerificationDTO =
                                  {
                                    email: userState.email,
                                    verificationAction:
                                      "account deletion verification",
                                  };
                                setSentDelete(true);
                                dispatch(
                                  reinitiateDeleteAccountVerification(
                                    reinitiateDeleteAccountVerificationDTO,
                                  ),
                                );
                              } else {
                                const error: ApiErrorResponse = {
                                  timestamp: new Date().toISOString(),
                                  path: location.pathname,
                                  message: "Insufficient browser data.",
                                  statusCode: 400,
                                };
                                setNoEmailAPIError(error);
                              }
                            }}
                            className="text-blue-600 underline underline-offset-2 transition ease-in-out hover:cursor-pointer active:opacity-55 dark:text-yellow-500"
                          >
                            Click here to get new code.
                          </span>
                        </>
                      ) : (
                        <>{deleteAccountErrorState.message}</>
                      )}
                    </>
                  )}
                </h1>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

export default DeleteAccountForm;
