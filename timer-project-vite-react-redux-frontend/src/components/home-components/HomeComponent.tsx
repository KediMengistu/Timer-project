import SidebarComponent from "./SidebarComponent";
import MainViewComponent from "./MainViewComponent";
import { useAppSelector } from "../../app/hooks";

function HomeComponent() {
  const viewIsExpanded = useAppSelector((state) => state.expandedView.value);
  return (
    <>
      <div className="grid {{ viewIsExpanded ? grid-cols-[1fr] : grid-cols-[1fr_2fr] }}">
        {viewIsExpanded ? (
          <></>
        ) : (
          <>
            <SidebarComponent />
          </>
        )}
        <MainViewComponent />
      </div>
    </>
  );
}

export default HomeComponent;
