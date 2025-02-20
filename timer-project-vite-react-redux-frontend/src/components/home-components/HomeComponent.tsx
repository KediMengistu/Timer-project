import SidebarComponent from "./SidebarComponent";
import MainViewComponent from "./MainViewComponent";

function HomeComponent() {
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-[1fr_2fr] md:grid-rows-1">
        <SidebarComponent />
        <MainViewComponent />
      </div>
    </>
  );
}

export default HomeComponent;
