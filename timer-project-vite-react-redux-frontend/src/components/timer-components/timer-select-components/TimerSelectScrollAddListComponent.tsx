import { useAppSelector } from "../../../app/hooks";
import TimerSelectScrollAddListItemComponent from "./TimerSelectScrollAddListItemComponent";

function TimerSelectScrollAddListComponent() {
  const timersState = useAppSelector((state) => state.timers);
  const currentTimerCount = timersState.ids.length;
  const remainingSlots = 3 - currentTimerCount;
  const placeholders = Array(remainingSlots > 0 ? remainingSlots : 0).fill(
    null,
  );

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
