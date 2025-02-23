function RegisterationNonMainComponent() {
  return (
    <>
      <div className="grid grid-rows-[auto_auto_1fr] bg-white p-2!">
        <div className="flex flex-row items-end justify-center p-2!">
          <h1 className="text-xl text-black underline underline-offset-4 md:text-4xl">
            Registeration:
          </h1>
        </div>
        <form
          action=""
          className="flex flex-col items-center justify-center gap-1 p-2!"
        >
          <input
            type="text"
            className="border-b-2 bg-white pt-1! pr-1! pb-1! pl-2! text-black outline-none"
            placeholder="Firstname"
            id="firstname"
            name="firstname"
            autoComplete="off"
          />
          <input
            type="text"
            className="border-b-2 bg-white pt-1! pr-1! pb-1! pl-2! text-black outline-none"
            placeholder="Lastname"
            id="lastname"
            name="lastname"
            autoComplete="off"
          />
          <input
            type="text"
            className="border-b-2 bg-white pt-1! pr-1! pb-1! pl-2! text-black outline-none"
            placeholder="Email"
            id="email"
            name="email"
            autoComplete="off"
          />
          <input
            type="password"
            className="border-b-2 bg-white pt-1! pr-1! pb-1! pl-2! text-black outline-none"
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
        <div className=""></div>
      </div>
    </>
  );
}

export default RegisterationNonMainComponent;
