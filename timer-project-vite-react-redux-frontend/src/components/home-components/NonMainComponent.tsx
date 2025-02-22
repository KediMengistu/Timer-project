import DefaultNonMainComponent from "./DefaultNonMainComponent";

function NonMainComponent() {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr] bg-white md:grid-rows-[1fr_3fr]">
        <div className="flex flex-row items-center justify-center p-1!">
          <h1 className="text-2xl md:text-6xl">Timer4U</h1>
        </div>
        <DefaultNonMainComponent />
      </div>
    </>
  );
}

export default NonMainComponent;
