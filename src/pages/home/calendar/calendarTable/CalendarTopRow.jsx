import React from "react";
import CalendarTopCell from "./CalendarTopCell";

export default function CalendarTopRow({ sizeState, calendarOption }) {
  const dayArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const calendarTopCells = [];

  dayArr.forEach((day, i) => {
    calendarTopCells.push(
      <CalendarTopCell
        key={i}
        idx={i}
        day={day}
        sizeState={sizeState}
        calendarOption={calendarOption}
      />
    );
  });

  return (
    <div className="h-1/6 w-full flex jusfity-center items-center">
      {calendarTopCells}
    </div>
  );
}
