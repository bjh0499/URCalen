import React from "react";
import { useAppSelector } from "../../../store/hooks";

export default function CalendarHeader() {
  let selectedYear = useAppSelector((state) => state.selectedMonth.year);
  let selectedMonth = useAppSelector((state) => state.selectedMonth.month);
  return (
    <div className="flex-center h-1/5 w-full">
      <div className="p-1 text-5xl">
        {selectedYear + Math.floor((selectedMonth - 1) / 12)}.
        {((selectedMonth + 11) % 12) + 1}
      </div>
    </div>
  );
}
