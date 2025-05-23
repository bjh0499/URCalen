import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

export default function Calendar({
  calendarKey,
  monthSelector,
  holidays,
  calendarOption,
  setRightClickPosition,
  calendarPosition,
  setCalendarPosition,
  calendarSize,
  setCalendarSize,
}) {
  const sizeState = calendarSize[calendarKey];
  const positionState = calendarPosition[calendarKey];

  const handleOnResize = (e, { node, size, handle }) => {
    const modifiedSize = JSON.parse(JSON.stringify(calendarSize));
    modifiedSize[calendarKey] = {
      width: size.width,
      height: size.height,
    };

    setCalendarSize(() => modifiedSize);
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    const clickObj = {
      key: calendarKey,
      clickX: e.clientX,
      clickY: e.clientY,
    };

    let element = e.target;

    do {
      const styleTransform = element.style.transform;

      if (styleTransform === "translate(0px)") {
        clickObj.calendarX = 0;
        clickObj.calendarY = 0;
        setRightClickPosition(() => clickObj);
        return;
      } else {
        const parts = /^translate\((-?\d{1,})px, (-?\d{1,})px\)$/.exec(
          styleTransform
        );

        if (parts) {
          clickObj.calendarX = parseInt(parts[1], 10);
          clickObj.calendarY = parseInt(parts[2], 10);
          setRightClickPosition(() => clickObj);
          return;
        } else {
          element = element.parentElement;
        }
      }
    } while (element);
  };

  const handleDragStop = (e, data) => {
    const modifiedPosition = JSON.parse(JSON.stringify(calendarPosition));
    modifiedPosition[calendarKey] = {
      x: data.x,
      y: data.y,
    };

    setCalendarPosition(() => modifiedPosition);
  };

  return (
    <Draggable
      cancel={".react-resizable-handle"}
      defaultPosition={{ x: positionState.x, y: positionState.y }}
      onStop={handleDragStop}
    >
      <Resizable
        className="hover-handles"
        width={sizeState.width}
        height={sizeState.height}
        minConstraints={[320, 320]}
        onResize={handleOnResize}
      >
        <div
          className="w-full h-full"
          style={{
            width: sizeState.width + "px",
            height: sizeState.height + "px",
          }}
          onContextMenu={handleRightClick}
        >
          <CalendarHeader monthSelector={monthSelector} />
          <CalendarTable
            calendarKey={calendarKey}
            monthSelector={monthSelector}
            holidays={holidays}
            sizeState={sizeState}
            calendarOption={calendarOption}
          />
        </div>
      </Resizable>
    </Draggable>
  );
}
