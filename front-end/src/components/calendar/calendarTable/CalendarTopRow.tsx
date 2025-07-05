import React from "react";
import { useAppSelector } from "../../../store/hooks";

import CalendarTopCell from "./CalendarTopCell";

import type CalendarOption from "../../../class/CalendarOption";

export default function CalendarTopRow({ calendarKey, sizeState }) {
  const selectedMonth = useAppSelector((state) => state.selectedMonth.month);
  const isFront = useAppSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + (isFront ? 0 : 1);
  const calendarPage = useAppSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );

  const calendarThisOption = calendarPage.widgetList[calendarKey]!
    .option as CalendarOption;
  const dayArr =
    calendarThisOption && calendarThisOption.lang === "EN"
      ? ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
      : ["일", "월", "화", "수", "목", "금", "토"];
  const calendarTopCells: Array<React.JSX.Element> = [];

  dayArr.forEach((day, i) => {
    calendarTopCells.push(
      <CalendarTopCell
        key={i}
        idx={i}
        calendarKey={calendarKey}
        day={day}
        sizeState={sizeState}
      />
    );
  });

  return <div className="flex-center h-1/6 w-full">{calendarTopCells}</div>;
}
