import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetTimersError,
  resetTimersStatus,
  retrieveAllTimers,
} from "../../features/timers/timersSlice";
import TimerSelectScrollListItemComponent from "./TimerSelectScrollListItemComponent";

function TimerSelectScrollListComponent() {
  const dispatch = useAppDispatch();
  const timersState = useAppSelector((state) => state.timers.allTimers);
  useEffect(() => {
    if (JSON.stringify(timersState.entities) === "{}") {
      dispatch(retrieveAllTimers()).then(() => {
        dispatch(resetTimersStatus());
        dispatch(resetTimersError());
      });
    }
  }, []);
  return timersState.ids.map((timerIds: string) => {
    return (
      <TimerSelectScrollListItemComponent
        key={`TimerSelectScrollListItem-${timerIds}`}
        item={timersState.entities[timerIds]}
      />
    );
  });
}

export default TimerSelectScrollListComponent;
