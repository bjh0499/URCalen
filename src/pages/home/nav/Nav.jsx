import React from "react";

import NavDivButton from "./NavDivButton";

export default function Nav({ monthSelector, setMonthSelector }) {
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
    <div className="flex items-center">
      <NavDivButton text="◀◀" clickFunc={prevYear} />
      <NavDivButton text="◀" clickFunc={prevMonth} />
      <NavDivButton text="▶" clickFunc={nextMonth} />
      <NavDivButton text="▶▶" clickFunc={nextYear} />
    </div>
  );
}
