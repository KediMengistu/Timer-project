import { useAppSelector } from "../../../app/hooks";
import TimerSelectScrollListItemComponent from "./TimerSelectScrollListItemComponent";
import TimerSelectScrollAddListComponent from "./TimerSelectScrollAddListComponent";

function TimerSelectScrollListComponent() {
  const timersState = useAppSelector((state) => state.timers);

  return (
    <>
      {timersState.ids.length === 3 ? (
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
