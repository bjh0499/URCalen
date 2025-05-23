export default function CalendarCell({
  dayObj,
  monthSelector,
  holidays,
  sizeState,
  calendarOption,
}) {
  const usingTextColor = [
    "text-red-300",
    "text-red-600",
    "text-blue-300",
    "text-blue-600",
    "text-stone-400",
    "text-stone-800",
  ];

  let giveClass = "flex-center w-full h-full ";
  let isHoliday = false;

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

  let selectColor;
  if (dayObj.day === 0 || isHoliday) {
    selectColor = "red";
  } else if (dayObj.day === 6) {
    selectColor = "blue";
  } else {
    selectColor = "stone";
  }

  giveClass += `text-${selectColor}-${
    (dayObj.day === 0 || dayObj.day === 6 || isHoliday ? 300 : 400) <<
    (monthSelector.month === dayObj.month)
  }`;

  return <div className={giveClass}>{dayObj.date}</div>;
}
