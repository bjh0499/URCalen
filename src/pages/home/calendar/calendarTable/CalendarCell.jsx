import React from "react";

export default function CalendarCell({ dayObj, monthSelector, holidays }) {
  let giveClass = "w-full h-full flex justify-center items-center ";
  let isHoliday = false;

  for (let i = 0; i < holidays.length; i++) {
    if (
      dayObj.year === holidays[i].year &&
      dayObj.month === holidays[i].month &&
      dayObj.date === holidays[i].date
    ) {
      isHoliday = true;
      break;
    }
  }

  /*
    HACK: 문자열을 결합하는 구조를 통해 조건문을 축약하고자 하는 시도가 있었음.
    그러나 이 경우 색상 적용이 제대로 동작하지 않아서 부득이하게 장황한 조건문을 그대로 두게 되었음.
  */
  if (dayObj.day === 0 || isHoliday) {
    if (monthSelector.month === dayObj.month) {
      giveClass += "text-red-600";
    } else {
      giveClass += "text-red-300";
    }
  } else if (dayObj.day === 6) {
    if (monthSelector.month === dayObj.month) {
      giveClass += "text-blue-600";
    } else {
      giveClass += "text-blue-300";
    }
  } else {
    if (monthSelector.month === dayObj.month) {
      giveClass += "text-stone-800";
    } else {
      giveClass += "text-stone-300";
    }
  }

  return <div className={giveClass}>{dayObj.date}</div>;
}
