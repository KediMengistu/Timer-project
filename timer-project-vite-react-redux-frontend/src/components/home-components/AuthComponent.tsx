function AuthComponent() {
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[1fr_2fr_1fr] rounded-sm bg-amber-50">
        <div className="flex flex-row items-center justify-center p-1!">
          <h3 className="text-lg italic">Welcome</h3>
        </div>
        <div className="grid grid-rows-2 bg-amber-300 p-1!">
          <div className="grid grid-rows-[1fr_2fr] gap-1 bg-pink-500">
            <div className="flex flex-row items-end justify-center">
              <label htmlFor="">Email:</label>
            </div>
            <div className="flex flex-row items-start justify-center">
              <input type="text" className="bg-white" />
            </div>
          </div>
          <div className="grid grid-rows-[1fr_2fr] gap-1 bg-pink-500">
            <div className="flex flex-row items-end justify-center">
              <label htmlFor="">Password:</label>
            </div>
            <div className="flex flex-row items-start justify-center">
              <input type="text" className="bg-white" />
            </div>
          </div>
        </div>
        <div className="p-1!">
          <button>hello</button>
        </div>
      </div>
    </>
  );
}

export default AuthComponent;
