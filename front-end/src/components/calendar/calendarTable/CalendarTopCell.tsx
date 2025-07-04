import React from "react";
import { useAppSelector } from "../../../store/hooks";

import type CalendarOption from "../../../class/CalendarOption";
import type WidgetSize from "../../../class/WidgetSize";

type CalendarTopCellInput = {
  idx: number;
  calendarKey: number;
  day: string;
  sizeState: WidgetSize;
};

export default function CalendarTopCell({ idx, calendarKey, day, sizeState }) {
  const selectedMonth = useAppSelector((state) => state.selectedMonth.month);
  const isFront = useAppSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + (isFront ? 0 : 1);
  const calendarPage = useAppSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );
  const calendarThisOption = calendarPage.widgetList[calendarKey]
    ?.option as CalendarOption;

  let giveClass = "flex-center w-full h-full ";

  if (sizeState.width < 324) {
    giveClass += "text-xs ";
  } else if (sizeState.width < 378) {
    giveClass += "text-sm ";
  } else if (sizeState.width < 432) {
    giveClass += "text-base ";
  } else if (sizeState.width < 486) {
    giveClass += "text-lg ";
  } else if (sizeState.width < 540) {
    giveClass += "text-xl ";
  } else if (sizeState.width < 648) {
    giveClass += "text-2xl ";
  } else if (sizeState.width < 810) {
    giveClass += "text-3xl ";
  } else {
    giveClass += "text-4xl ";
  }

  if (idx === 0) {
    giveClass += "text-red-600";
  } else if (idx === 6) {
    giveClass += "text-blue-600";
  } else {
    giveClass += "text-stone-800";
  }

  return <div className={giveClass}>{day}</div>;
}
