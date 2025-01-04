import React, { useState } from "react";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

export default function Calendar({ monthSelector, holidays }) {
  const [drag, setDrag] = useState(false);
  const [calendarSize, setCalendarSize] = useState({
    width: "384px",
    height: "384px",
  });

  // HACK: Drag 시 나타나는 잔영 효과를 없애기 위해, 1px짜리 이미지를 대신 불러오도록 함
  function handleDragStart(e) {
    let onePx = document.createElement("img");
    onePx.src = "/1px.png";
    e.dataTransfer.setDragImage(onePx, 0, 0);
  }

  function handleDragEnd(e) {
    console.log("drag end");
  }

  return (
    <div
      className="flex flex-col items-center"
      style={calendarSize}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CalendarHeader monthSelector={monthSelector} />
      <CalendarTable monthSelector={monthSelector} holidays={holidays} />
    </div>
  );
}
