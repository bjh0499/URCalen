import React, { useState } from "react";
import { ResizableBox } from "react-resizable";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

export default function Calendar({ monthSelector, holidays }) {
  const handleOnResize = (e) => {
    console.log(e);
  };

  return (
    <ResizableBox
      width={384}
      height={384}
      minConstraints={[384, 384]}
      onResize={handleOnResize}
    >
      <div className="w-full h-full border">
        <CalendarHeader monthSelector={monthSelector} />
        <CalendarTable monthSelector={monthSelector} holidays={holidays} />
      </div>
    </ResizableBox>
  );
}
