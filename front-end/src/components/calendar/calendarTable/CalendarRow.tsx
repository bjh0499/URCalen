import React from "react";

import CalendarCell from "./CalendarCell";

import type DayObject from "../../../class/DayObject";

type CalendarRowInput = {
  calendarKey: number;
  dayList: Array<DayObject>;
  holidays: Array<DayObject>;
  sizeState: object;
};

export default function CalendarRow({
  calendarKey,
  dayList,
  holidays,
  sizeState,
}: CalendarRowInput) {
  let calendarCells: Array<React.JSX.Element> = [];
  dayList.forEach((dayObj, i) => {
    calendarCells.push(
      <CalendarCell
        key={i}
        calendarKey={calendarKey}
        dayObj={dayObj}
        holidays={holidays}
        sizeState={sizeState}
      />
    );
  });

  return <div className="flex-center h-1/6 w-full">{calendarCells}</div>;
}
