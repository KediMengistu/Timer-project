import { useAppSelector } from "../../../app/hooks";
import { Break } from "../../../features/breaks/breakDTO";
import { Timer } from "../../../features/timers/timerDTO";
import BreakLocalItemComponent from "./BreakLocalItemComponent";

function BreakLocalListComponent({ item }: { item: Timer }) {
  const breaksState = useAppSelector((state) => state.breaks);
  return (
    <div className="scrollbar-none ml-2! inline h-full w-full shrink-0 grow-0 snap-center snap-always overflow-y-auto rounded-sm border-1 border-black bg-white align-middle whitespace-normal shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-gray-700 dark:bg-gray-800">
      <div
        className={`grid h-fit w-full grid-rows-${breaksState.entities[item.id].breaks.length}`}
      >
        {breaksState.entities[item.id].breaks.map((breakObject: Break) => {
          return (
            <BreakLocalItemComponent
              key={breakObject.id}
              item={breakObject}
              addedTime={item.pausedDurationInMs}
              numberOfBreaks={item.numberOfBreaks}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BreakLocalListComponent;
