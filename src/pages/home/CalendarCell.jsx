import React from "react";

export default function CalendarCell({ dayObj }) {
  let giveClass = "";
  if (dayObj.day === 0) {
    giveClass = "bg-red-500";
  } else if (dayObj.day === 6) {
    giveClass = "bg-blue-500";
  }

  return <div className={giveClass}>{dayObj.date}</div>;
}
