import SidebarTopComponent from "./SidebarTopComponent";
import SidebarMiddleBottomComponent from "./SidebarMiddleBottomComponent";

function SidebarComponent() {
  return (
    <>
      <div className="grid grid-rows-[1fr_4fr] gap-4 p-4!">
        <SidebarTopComponent />
        <SidebarMiddleBottomComponent />
      </div>
    </>
  );
}

export default SidebarComponent;
