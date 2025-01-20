import React, { useState } from "react";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";
import TempCalendarMenu from "./calendarTable/TempCalendarMenu";

export default function Calendar({
  calendarKey,
  monthSelector,
  holidays,
  calendarKeyList,
  setCalendarKeyList,
  setRightClickPosition,
}) {
  const [sizeState, setSizeState] = useState({
    width: 320,
    height: 320,
  });

  const handleOnResize = (e, { node, size, handle }) => {
    setSizeState({
      width: size.width,
      height: size.height,
    });
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setRightClickPosition(() => ({
      x: e.clientX,
      y: e.clientY,
    }));
  };

  return (
    <Draggable cancel={".react-resizable-handle"}>
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
          <TempCalendarMenu
            calendarKey={calendarKey}
            calendarKeyList={calendarKeyList}
            setCalendarKeyList={setCalendarKeyList}
          />
          <CalendarHeader monthSelector={monthSelector} />
          <CalendarTable
            monthSelector={monthSelector}
            holidays={holidays}
            sizeState={sizeState}
          />
        </div>
      </Resizable>
    </Draggable>
  );
}
