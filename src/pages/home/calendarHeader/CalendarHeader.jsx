import React from "react";

export default function CalendarHeader({ monthSelector, setMonthSelector }) {
  const prevYear = () => {
    setMonthSelector({
      year: monthSelector.year - 1,
      month: monthSelector.month,
    });
  };
  const prevMonth = () => {
    setMonthSelector({
      year: monthSelector.year - (monthSelector.month === 0),
      month: (monthSelector.month + 11) % 12,
    });
  };
  const nextMonth = () => {
    setMonthSelector({
      year: monthSelector.year + (monthSelector.month === 11),
      month: (monthSelector.month + 1) % 12,
    });
  };
  const nextYear = () => {
    setMonthSelector({
      year: monthSelector.year + 1,
      month: monthSelector.month,
    });
  };
  return (
    <div class="flex items-center">
      <div class="p-1" onClick={prevYear}>
        <button class="text-2xl" onClick={prevYear}>
          ◀◀
        </button>
      </div>
      <div class="p-1">
        <button class="text-2xl" onClick={prevMonth}>
          ◀
        </button>
      </div>
      <div class="p-1 text-5xl">
        {monthSelector.year}.{monthSelector.month + 1}
      </div>
      <div class="p-1">
        <button class="text-2xl" onClick={nextMonth}>
          ▶
        </button>
      </div>
      <div class="p-1">
        <button class="text-2xl" onClick={nextYear}>
          ▶▶
        </button>
      </div>
    </div>
  );
}
