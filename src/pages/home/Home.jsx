import React from "react";
import { useState } from "react";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

export default function Home() {
  let today = new Date();
  const [monthSelector, setMonthSelector] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  return (
    <div>
      <CalendarHeader
        monthSelector={monthSelector}
        setMonthSelector={setMonthSelector}
      />
      <CalendarTable monthSelector={monthSelector} />
    </div>
  );
}
