import React from "react";

export default function CalendarMenu({ x, y }) {
  return (
    <div style={{ position: "absolute", left: `${x}px`, top: `${y}px` }}>
      CalendarMenu
    </div>
  );
}
