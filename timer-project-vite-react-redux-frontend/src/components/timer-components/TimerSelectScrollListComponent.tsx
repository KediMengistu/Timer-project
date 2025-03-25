import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetTimersError,
  resetTimersStatus,
  retrieveAllTimers,
} from "../../features/timers/timersSlice";
import TimerSelectScrollListItemComponent from "./TimerSelectScrollListItemComponent";
import TimerSelectScrollAddListComponent from "./TimerSelectScrollAddListComponent";

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

  return (
    <>
      {timersState.entities.ids === 3 ? (
        <>
          {timersState.ids.map((timerIds: string) => {
            return (
              <TimerSelectScrollListItemComponent
                key={`TimerSelectScrollListItem-${timerIds}`}
                item={timersState.entities[timerIds]}
              />
            );
          })}
        </>
      ) : (
        <>
          {timersState.ids.map((timerIds: string) => {
            return (
              <TimerSelectScrollListItemComponent
                key={`TimerSelectScrollListItem-${timerIds}`}
                item={timersState.entities[timerIds]}
              />
            );
          })}
          <TimerSelectScrollAddListComponent />
        </>
      )}
    </>
  );
}

export default TimerSelectScrollListComponent;
