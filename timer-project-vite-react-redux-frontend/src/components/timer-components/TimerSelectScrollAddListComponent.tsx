import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetTimersError,
  resetTimersStatus,
  retrieveAllTimers,
} from "../../features/timers/timersSlice";
import TimerSelectScrollAddListItemComponent from "./TimerSelectScrollAddListItemComponent";

function TimerSelectScrollAddListComponent() {
  const dispatch = useAppDispatch();
  const timersState = useAppSelector((state) => state.timers.allTimers);
  const currentTimerCount = timersState.ids.length;
  const remainingSlots = 3 - currentTimerCount;
  const placeholders = Array(remainingSlots > 0 ? remainingSlots : 0).fill(
    null,
  );

  useEffect(() => {
    if (JSON.stringify(timersState.entities) === "{}") {
      dispatch(retrieveAllTimers()).then(() => {
        dispatch(resetTimersStatus());
        dispatch(resetTimersError());
      });
    }
  }, []);

  return (
    <>
      {placeholders.map((_, index) => (
        <TimerSelectScrollAddListItemComponent
          key={`TimerSelectScrollAddListItem-${index}`}
        />
      ))}
    </>
  );
}

export default TimerSelectScrollAddListComponent;
