import React, { useState } from "react";
import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

export default function Calendar({ monthSelector, holidays }) {
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

  return (
    <Draggable cancel={".react-resizable-handle"}>
      <Resizable
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
        >
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
