import React from "react";

import CalendarRow from "./CalendarRow";

export default function CalendarTable() {
  let today = new Date();
  let inputDay = new Date(today.getFullYear(), today.getMonth(), 1);
  console.log(inputDay);
  while (inputDay.getDay() > 0) {
    inputDay = new Date(inputDay.valueOf() - 86400000);
  }

  return (
    <div>
      <CalendarRow />
      <CalendarRow />
      <CalendarRow />
      <CalendarRow />
      <CalendarRow />
    </div>
  );
}
