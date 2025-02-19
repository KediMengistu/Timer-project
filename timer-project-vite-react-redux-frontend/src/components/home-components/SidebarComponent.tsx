import SidebarTopComponent from "./SidebarTopComponent";
import SidebarMiddleBottomComponent from "./SidebarMiddleBottomComponent";

function SidebarComponent() {
  return (
    <>
      <div className="grid grid-rows-[1fr_4fr] bg-cyan-500">
        <SidebarTopComponent />
        <SidebarMiddleBottomComponent />
      </div>
    </>
  );
}

export default SidebarComponent;
