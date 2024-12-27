import React from "react";

export default function CalendarCell({ color }) {
  let giveClass = "";
  if (color === "red") {
    giveClass = "bg-red-500";
  } else if (color === "blue") {
    giveClass = "bg-blue-500";
  }

  return <div className={giveClass}>CalendarCell</div>;
}
