import React from "react";

export default function CalendarTopCell({ idx, day, sizeState }) {
  let giveClass = "w-full h-full flex justify-center items-center ";

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
