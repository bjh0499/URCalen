import React from "react";

export default function CalendarMenu({ x, y }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{ position: "absolute", left: `${x}px`, top: `${y}px` }}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      CalendarMenu
    </div>
  );
}
