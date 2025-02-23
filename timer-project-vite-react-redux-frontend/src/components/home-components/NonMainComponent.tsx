import DefaultNonMainComponent from "./DefaultNonMainComponent";
import { useAppSelector } from "../../app/hooks";
import RegisterationNonMainComponent from "./RegisterationNonMainComponent";

function NonMainComponent() {
  const isRegistering = useAppSelector((state) => state.register.value);
  return (
    <>
      <div className="grid grid-rows-[auto_1fr] bg-white md:grid-rows-[1fr_3fr]">
        <div className="flex flex-row items-center justify-center p-1!">
          <h1 className="text-2xl md:text-6xl">Timer4U</h1>
        </div>
        <div className="grid grid-cols-1 grid-rows-none gap-2 border-t-2 md:grid-cols-none md:grid-rows-1">
          {isRegistering === false ? (
            <>
              <DefaultNonMainComponent />
            </>
          ) : (
            <>
              <RegisterationNonMainComponent />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default NonMainComponent;
