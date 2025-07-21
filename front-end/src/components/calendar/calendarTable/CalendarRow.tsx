import React from "react";

import CalendarCell from "./CalendarCell";

import type DayObject from "../../../class/DayObject";
import type WidgetSize from "../../../class/WidgetSize";
import CalendarPage from "../../../class/CalendarPage";

type CalendarRowInput = {
  calendarKey: number;
  dayList: Array<DayObject>;
  holidays: Array<DayObject>;
  selectedMonth: number;
  calendarPage: CalendarPage;
  sizeState: WidgetSize;
};

export default function CalendarRow({
  calendarKey,
  dayList,
  holidays,
  selectedMonth,
  calendarPage,
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
        selectedMonth={selectedMonth}
        calendarPage={calendarPage}
        sizeState={sizeState}
      />
    );
  });

  return <div className="flex-center h-1/6 w-full">{calendarCells}</div>;
}
