import { useAppDispatch } from "../../app/hooks";
import { toggleExpandedView } from "../../features/expandedView/expandedViewSlice";

function MainViewComponent() {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="relative bg-blue-500">
        <button
          className="absolute bottom-2 left-2 h-10 w-12 rounded-md bg-amber-900"
          onClick={() => {
            dispatch(toggleExpandedView());
          }}
        >
          {" "}
          +{" "}
        </button>
      </div>
    </>
  );
}

export default MainViewComponent;
