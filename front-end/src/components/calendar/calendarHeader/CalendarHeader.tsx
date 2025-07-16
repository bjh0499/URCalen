import React from "react";

export default function CalendarHeader({ selectedYear, selectedMonth }) {
  return (
    <div className="flex-center h-1/5 w-full">
      <div className="p-1 text-5xl">
        {selectedYear + Math.floor((selectedMonth - 1) / 12)}.
        {((selectedMonth + 11) % 12) + 1}
      </div>
    </div>
  );
}
