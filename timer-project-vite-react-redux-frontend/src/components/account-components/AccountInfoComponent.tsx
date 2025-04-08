import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useAppSelector } from "../../app/hooks";
import { extractLocalTime } from "../../utils/functions/extractLocalTime";
import { extractDate } from "../../utils/functions/extractDate";
import { extractAmPm } from "../../utils/functions/extractAMPM";

function AccountInfoComponent() {
  const navigate = useNavigate();
  const userState = useAppSelector((state) => state.user.user);

  const handleGoHomeClick = () => {
    navigate("/");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`AccountInfoComponent`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ willChange: "transform", backfaceVisibility: "hidden" }}
        className="relative h-full w-full flex-1 rounded-lg border-2 border-black bg-white p-1! dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="absolute top-[50%] left-[50%] grid h-60 w-56 -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] rounded-2xl border-2 border-black bg-white p-1! shadow-[2.25px_3px_0_2px_rgba(0,0,0,0.516)] dark:border-gray-700 dark:bg-gray-800">
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
              Account Information
              <br />
              <span className="font-bold text-red-500 underline underline-offset-2 dark:text-yellow-400">
                Local
              </span>{" "}
              Times Only
            </h1>
          </div>
          <div className="grid h-full w-full grid-rows-10 gap-1 p-1!">
            <div className="border-b-1 border-black dark:border-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Email</span>
                <span className="font-bold italic">{userState!.email}</span>
              </h1>
            </div>
            <div className="border-b-1 border-black dark:border-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Name</span>
                <span className="font-bold italic">
                  {userState!.firstName} {userState!.lastName}
                </span>
              </h1>
            </div>
            <div className="border-b-1 border-black dark:border-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Verification Status</span>
                <span className="font-bold italic">
                  {userState!.isVerified ? "Verified" : "Unverified"}
                </span>
              </h1>
            </div>
            <div className="border-b-1 border-black dark:border-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Number of Timers</span>
                <span className="font-bold italic">
                  {userState!.numberOfTimers}
                </span>
              </h1>
            </div>
            <div className="border-b-1 border-black dark:border-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Last Sign-in Date</span>
                <span className="font-bold text-red-500 italic dark:text-yellow-500">
                  {extractDate(userState!.previousSigninTime)}
                </span>
              </h1>
            </div>
            <div className="border-b-1 border-black dark:border-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Last Sign-in Date</span>
                <span className="font-bold text-red-500 italic dark:text-yellow-500">
                  {extractLocalTime(userState!.previousSigninTime)}{" "}
                  {extractAmPm(userState!.previousSigninTime)}
                </span>
              </h1>
            </div>
            <div className="border-b-1 border-black dark:border-gray-700">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Account Expire Date</span>
                <span className="font-bold text-red-500 italic dark:text-yellow-500">
                  {extractDate(userState!.userAccountExpirationTime)}
                </span>
              </h1>
            </div>
            <div className="">
              <h1 className="flex items-center justify-between text-xs text-black dark:text-white">
                <span>Account Expire Time</span>
                <span className="font-bold text-red-500 italic dark:text-yellow-500">
                  {extractLocalTime(userState!.userAccountExpirationTime)}{" "}
                  {extractAmPm(userState!.userAccountExpirationTime)}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AccountInfoComponent;
