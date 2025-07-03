import React from "react";
import { useAppSelector } from "../../../store/hooks";

import type DayObject from "../../../class/DayObject";
import type WidgetSize from "../../../class/WidgetSize";

import CalendarRow from "./CalendarRow";
import CalendarTopRow from "./CalendarTopRow";

type CalendarTableInput = {
  calendarKey: number;
  holidays: Array<DayObject>;
  sizeState: WidgetSize;
};

export default function CalendarTable({
  calendarKey,
  holidays,
  sizeState,
}: CalendarTableInput) {
  let selectedYear = useAppSelector((state) => state.selectedMonth.year);
  let selectedMonth = useAppSelector((state) => state.selectedMonth.month);
  let inputDay = new Date(selectedYear, selectedMonth - 1, 1);
  while (inputDay.getDay() > 0) {
    inputDay = new Date(inputDay.valueOf() - 86400000);
  }

  if (!selectedMonth) {
    selectedYear--;
  } else if (selectedMonth === 13) {
    selectedYear++;
  }

  selectedMonth = (selectedMonth + 11) % 12;

  let calendarRows: Array<React.JSX.Element> = [];
  let i = 0;
  do {
    let dayList: Array<DayObject> = [];
    for (let j = 0; j < 7; j++) {
      dayList.push({
        year: inputDay.getFullYear(),
        month: inputDay.getMonth(),
        date: inputDay.getDate(),
        day: inputDay.getDay(),
      });
      inputDay = new Date(inputDay.valueOf() + 86400000);
    }
    calendarRows.push(
      <CalendarRow
        key={i}
        calendarKey={calendarKey}
        dayList={dayList}
        holidays={holidays}
        sizeState={sizeState}
      />
    );

    i++;
  } while (
    inputDay.getFullYear() === selectedYear &&
    inputDay.getMonth() === selectedMonth
  );

  return (
    <div className="flex-col-center h-4/5 w-full">
      <CalendarTopRow calendarKey={calendarKey} sizeState={sizeState} />
      {calendarRows}
    </div>
  );
}
