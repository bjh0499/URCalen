import React from "react";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

export default function Calendar({ monthSelector, holidays }) {
  return (
    <div className="size-96 flex flex-col items-center">
      <CalendarHeader monthSelector={monthSelector} />
      <CalendarTable monthSelector={monthSelector} holidays={holidays} />
    </div>
  );
}
