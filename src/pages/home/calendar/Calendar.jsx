import React, { useState } from "react";
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
  // TODO: export 기능을 위해 sizeState와 positionState를 각 달력에 대한 key로 참조하는 state로 만들어 최상단 component에서 관리하도록 변경 예정
  const [sizeState, setSizeState] = useState({
    width: 320,
    height: 320,
  });

  const [positionState, setPositionState] = useState({});

  // TODO: 최상단 component에서 해당 달력 크기를 관리하는 형식으로 수정
  const handleOnResize = (e, { node, size, handle }) => {
    setSizeState({
      width: size.width,
      height: size.height,
    });
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

  // TODO: 최상단 component에서 해당 달력 위치를 관리하는 형식으로 수정
  const handleDragStop = (e, data) => {
    setPositionState(() => ({
      x: data.x,
      y: data.y,
    }));
  };

  return (
    <Draggable cancel={".react-resizable-handle"} onStop={handleDragStop}>
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
