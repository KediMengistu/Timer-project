function DefaultNonMainComponent() {
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-none gap-2 border-t-2 md:grid-cols-none md:grid-rows-1 md:border-b-0">
        <div className="grid grid-rows-[auto_auto_auto_1fr] p-2!">
          <div className="flex flex-row items-end justify-center p-2!">
            <h1 className="text-2xl underline underline-offset-4 md:text-4xl">
              Login:
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
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
          </div>
          <div className="grid grid-rows-2 gap-2 p-2!">
            <div className="flex flex-row items-start justify-center">
              <button className="w-30 rounded-3xl bg-black p-2! outline-0 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-600 active:bg-gray-400">
                <h1 className="text-xs text-white">Submit</h1>
              </button>
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
              <button className="w-35 rounded-3xl bg-black p-2! outline-0 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-600 active:bg-gray-400">
                <h1 className="text-xs text-white">Register</h1>
              </button>
              <button className="w-35 rounded-3xl bg-black p-2! outline-0 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-gray-600 active:bg-gray-400">
                <h1 className="text-xs text-white">Forgot Password</h1>
              </button>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-1">
            <button className="group rounded-sm bg-gray-200 outline-0 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:bg-gray-400 md:rounded-md">
              <h1 className="italic underline underline-offset-4 group-hover:cursor-pointer group-hover:text-white">
                Continue As Guest &rarr;
              </h1>
            </button>
            <button className="group rounded-sm bg-gray-200 outline-0 transition duration-300 ease-in-out hover:cursor-pointer hover:bg-black active:bg-gray-400 md:rounded-md">
              <h1 className="italic underline underline-offset-4 group-hover:cursor-pointer group-hover:text-white">
                Learn About The Project &rarr;
              </h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DefaultNonMainComponent;
