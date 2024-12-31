import React from "react";
import { useState } from "react";

import Nav from "./nav/Nav";
import Calendar from "./calendar/Calendar";

export default function Home() {
  let today = new Date();
  const [monthSelector, setMonthSelector] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  return (
    <div>
      <Nav monthSelector={monthSelector} setMonthSelector={setMonthSelector} />
      <Calendar monthSelector={monthSelector} />
    </div>
  );
}
