import React from "react";

export default function CalendarHeader({ monthSelector }) {
  return (
    <div className="flex items-center">
      <div className="p-1 text-5xl">
        {monthSelector.year}.{monthSelector.month + 1}
      </div>
    </div>
  );
}
