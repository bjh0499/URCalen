import React, { useState } from "react";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

export default function Calendar({ monthSelector, holidays }) {
  const [drag, setDrag] = useState(false);
  let startX = -1;
  let startY = -1;
  const [calendarSize, setCalendarSize] = useState({
    width: "384px",
    height: "384px",
  });

  // HACK: Drag 시 나타나는 잔영 효과를 없애기 위해, 1px짜리 이미지를 대신 불러오도록 함
  function handleDragStart(e) {
    let onePx = document.createElement("img");
    onePx.src = "/1px.png";
    e.dataTransfer.setDragImage(onePx, 0, 0);
    startX = e.clientX;
    startY = e.clientY;
    console.log(e);
  }

  function handleDrag(e) {
    //
  }

  function handleDragEnd(e) {
    let widthString = calendarSize.width;
    let heightString = calendarSize.height;
    let finalX = Math.max(
      Number(widthString.substring(0, widthString.length - 2)) +
        e.clientX -
        startX,
      384
    );
    let finalY = Math.max(
      Number(widthString.substring(0, widthString.length - 2)) +
        e.clientY -
        startY,
      384
    );

    setCalendarSize({
      width: finalX + "px",
      height: finalY + "px",
    });
  }

  return (
    <div
      className="flex flex-col items-center"
      style={calendarSize}
      draggable={true}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <CalendarHeader monthSelector={monthSelector} />
      <CalendarTable monthSelector={monthSelector} holidays={holidays} />
    </div>
  );
}
