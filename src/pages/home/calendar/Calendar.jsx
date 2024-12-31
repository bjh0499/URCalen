import React from "react";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

export default function Calendar({ monthSelector }) {
  return (
    <div className="w-min">
      <div className="flex flex-col items-center">
        <CalendarHeader monthSelector={monthSelector} />
        <CalendarTable monthSelector={monthSelector} />
      </div>
    </div>
  );
}
