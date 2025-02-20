import AuthComponent from "./AuthComponent";

function SidebarMiddleBottomComponent() {
  return (
    <>
      <div className="grid grid-cols-1 bg-red-500 p-4!">
        <AuthComponent />
      </div>
    </>
  );
}

export default SidebarMiddleBottomComponent;
