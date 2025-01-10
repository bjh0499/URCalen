import React, { useState } from "react";
import { Resizable } from "react-resizable";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

export default function Calendar({ monthSelector, holidays }) {
  const [sizeState, setSizeState] = useState({
    width: 384,
    height: 384,
  });

  const handleOnResize = (e, { node, size, handle }) => {
    setSizeState({
      width: size.width,
      height: size.height,
    });
  };

  return (
    <Resizable
      width={sizeState.width}
      height={sizeState.height}
      minConstraints={[384, 384]}
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
        <CalendarTable monthSelector={monthSelector} holidays={holidays} />
      </div>
    </Resizable>
  );
}
