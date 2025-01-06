import React, { useState } from "react";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

export default function Calendar({ monthSelector, holidays }) {
  const [start, setStart] = useState({
    x: -1,
    y: -1,
    width: "384px",
    height: "384px",
  });

  const [calendarSize, setCalendarSize] = useState({
    width: "384px",
    height: "384px",
  });

  // HACK: Drag 시 나타나는 잔영 효과를 없애기 위해, 1px짜리 이미지를 대신 불러오도록 함
  function handleDragStart(e) {
    let onePx = document.createElement("img");
    onePx.src = "/1px.png";
    e.dataTransfer.setDragImage(onePx, 0, 0);
    setStart({
      x: e.clientX,
      y: e.clientY,
      width: calendarSize.width,
      height: calendarSize.height,
    });
  }

  // BUG: dragover event를 쓸 경우, 실시간 크기 변경은 되지만, 포인터를 빨리 움직여 HTML 요소에서 벗어나면 크기 조절이 안 됨
  // dragover는 HTML 전체에 두고, 각 div에 hover event를 넣어 해당 div에 커서가 있는 상태에서 드래그할 때 크기 조절이 되도록 변경 예정
  function handleDragOver(e) {
    let finalX = Math.max(
      Number(start.width.substring(0, start.width.length - 2)) +
        e.clientX -
        start.x,
      384
    );
    let finalY = Math.max(
      Number(start.height.substring(0, start.height.length - 2)) +
        e.clientY -
        start.y,
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
      onDragOver={handleDragOver}
    >
      <CalendarHeader monthSelector={monthSelector} />
      <CalendarTable monthSelector={monthSelector} holidays={holidays} />
    </div>
  );
}
