import React from "react";

import CalendarCell from "./CalendarCell";

export default function CalendarRow({
  dayList,
  monthSelector,
  holidays,
  sizeState,
}) {
  let calendarCells = [];
  dayList.forEach((dayObj, i) => {
    calendarCells.push(
      <CalendarCell
        key={i}
        dayObj={dayObj}
        monthSelector={monthSelector}
        holidays={holidays}
        sizeState={sizeState}
      />
    );
  });

  return (
    <div className="h-1/6 w-full flex jusfity-center items-center">
      {calendarCells}
    </div>
  );
}
