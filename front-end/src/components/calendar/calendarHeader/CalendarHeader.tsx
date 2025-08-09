import React from "react";

type CalendarHeaderInput = {
  selectedYear: number;
  selectedMonth: number;
};

export default function CalendarHeader({
  selectedYear,
  selectedMonth,
}: CalendarHeaderInput) {
  return (
    <div className="flex-center h-1/5 w-full">
      <div className="p-1 text-5xl">
        {selectedYear + Math.floor((selectedMonth - 1) / 12)}.
        {((selectedMonth + 11) % 12) + 1}
      </div>
    </div>
  );
}
