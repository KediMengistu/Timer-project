import { useAppDispatch } from "../../app/hooks";
import { toggleRegister } from "../../features/register/registerSlice";

function DefaultNonMainComponent() {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="grid grid-rows-[auto_auto_auto_1fr] p-2!">
        <div className="flex flex-row items-end justify-center p-2!">
          <h1 className="text-xl underline underline-offset-4 md:text-4xl">
            Login:
          </h1>
        </div>
        <form className="flex flex-col items-center justify-center gap-2">
          <input
            type="text"
            className="rounded-3xl bg-white pt-2! pr-2! pb-2! pl-4! shadow-sm shadow-black outline-none"
            placeholder="Email"
            id="email"
            name="email"
            autoComplete="off"
          />
          <input
            type="password"
            className="rounded-3xl bg-white pt-2! pr-2! pb-2! pl-4! shadow-sm shadow-black outline-none"
            placeholder="Password"
            id="password"
            name="password"
            autoComplete="off"
          />
          <button
            className="w-30 rounded-3xl bg-black p-2! outline-0 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-600 active:bg-gray-400"
            type="submit"
          >
            <h1 className="text-xs text-white">Submit</h1>
          </button>
        </form>
        <div className="grid grid-rows-1 gap-2 p-2!">
          <div className="flex flex-row items-center justify-center gap-4">
            <button
              className="w-35 rounded-3xl bg-black p-2! outline-0 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-600 active:bg-gray-400"
              onClick={() => {
                dispatch(toggleRegister());
              }}
            >
              <h1 className="text-xs text-white">Register</h1>
            </button>
            <button className="w-35 rounded-3xl bg-black p-2! outline-0 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-600 active:bg-gray-400">
              <h1 className="text-xs text-white">Forgot Password</h1>
            </button>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-1">
          <button className="group rounded-xs bg-gray-200 outline-0 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:bg-gray-400 md:rounded-md">
            <h1 className="text-xs italic underline underline-offset-4 group-hover:cursor-pointer group-hover:text-white md:text-lg">
              Continue As Guest &rarr;
            </h1>
          </button>
          <button className="group rounded-xs bg-gray-200 outline-0 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:bg-gray-400 md:rounded-md">
            <h1 className="text-xs italic underline underline-offset-4 group-hover:cursor-pointer group-hover:text-white md:text-lg">
              Learn About The Project &rarr;
            </h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default DefaultNonMainComponent;
