import React from "react";

import CalendarCell from "./CalendarCell";

export default function CalendarRow() {
  return (
    <div className="flex flex-row">
      <CalendarCell color={"red"} />
      <CalendarCell />
      <CalendarCell />
      <CalendarCell />
      <CalendarCell />
      <CalendarCell />
      <CalendarCell color={"blue"} />
    </div>
  );
}
