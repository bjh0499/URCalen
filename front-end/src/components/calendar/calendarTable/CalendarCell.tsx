import React from "react";
import { useAppSelector } from "../../../store/hooks";

import type CalendarCellInput from "../../../class/CalendarCellInput";

export default function CalendarCell(inputData: CalendarCellInput) {
  let selectedMonth = useAppSelector((state) => state.selectedMonth.month);
  const isFront = useAppSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + (isFront ? 1 : 0);
  const calendarPage = useAppSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );
  const calendarThisOption =
    calendarPage.widgetList[inputData.calendarKey]?.option;

  const usingTextColor = [
    "text-red-300",
    "text-red-600",
    "text-blue-300",
    "text-blue-600",
    "text-stone-400",
    "text-stone-800",
  ];

  let giveClass = "flex-center w-full h-full ";
  let isHoliday = false;

  // TODO: sizeState에 대한 구체적인 Type 명시 필요
  if (inputData.sizeState.width < 324) {
    giveClass += "text-xs ";
  } else if (inputData.sizeState.width < 378) {
    giveClass += "text-sm ";
  } else if (inputData.sizeState.width < 432) {
    giveClass += "text-base ";
  } else if (inputData.sizeState.width < 486) {
    giveClass += "text-lg ";
  } else if (inputData.sizeState.width < 540) {
    giveClass += "text-xl ";
  } else if (inputData.sizeState.width < 648) {
    giveClass += "text-2xl ";
  } else if (inputData.sizeState.width < 810) {
    giveClass += "text-3xl ";
  } else {
    giveClass += "text-4xl ";
  }

  for (let i = 0; i < inputData.holidays.length; i++) {
    if (
      inputData.dayObj.year === inputData.holidays[i].year &&
      inputData.dayObj.month === inputData.holidays[i].month &&
      inputData.dayObj.date === inputData.holidays[i].date
    ) {
      isHoliday = true;
      break;
    }
  }

  let selectColor: string;
  if (inputData.dayObj.day === 0 || isHoliday) {
    selectColor = "red";
  } else if (inputData.dayObj.day === 6) {
    selectColor = "blue";
  } else {
    selectColor = "stone";
  }

  selectedMonth = (selectedMonth + 11) % 12;

  giveClass += `text-${selectColor}-${
    (inputData.dayObj.day === 0 || inputData.dayObj.day === 6 || isHoliday
      ? 300
      : 400) << (selectedMonth === inputData.dayObj.month ? 1 : 0)
  }`;

  return <div className={giveClass}>{inputData.dayObj.date}</div>;
}
