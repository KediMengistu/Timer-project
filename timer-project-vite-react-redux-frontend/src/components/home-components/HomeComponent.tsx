import NonMainComponent from "./NonMainComponent";
import MainComponent from "./MainComponent";

function HomeComponent() {
  return (
    <>
      <div className="grid grid-cols-none grid-rows-2 md:grid-cols-[1fr_2fr] md:grid-rows-none">
        <NonMainComponent />
        <MainComponent />
      </div>
    </>
  );
}

export default HomeComponent;
