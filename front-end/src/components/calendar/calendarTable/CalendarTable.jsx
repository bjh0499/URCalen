import CalendarRow from "./CalendarRow";
import CalendarTopRow from "./CalendarTopRow";

export default function CalendarTable({
  calendarKey,
  monthSelector,
  holidays,
  sizeState,
  calendarOption,
}) {
  let inputDay = new Date(monthSelector.year, monthSelector.month, 1);
  while (inputDay.getDay() > 0) {
    inputDay = new Date(inputDay.valueOf() - 86400000);
  }

  let calendarRows = [];
  for (let i = 0; i < 5; i++) {
    let dayList = [];
    for (let j = 0; j < 7; j++) {
      dayList.push({
        year: inputDay.getFullYear(),
        month: inputDay.getMonth(),
        date: inputDay.getDate(),
        day: inputDay.getDay(),
      });
      inputDay = new Date(inputDay.valueOf() + 86400000);
    }
    calendarRows.push(
      <CalendarRow
        key={i}
        calendarKey={calendarKey}
        dayList={dayList}
        monthSelector={monthSelector}
        holidays={holidays}
        sizeState={sizeState}
        calendarOption={calendarOption}
      />
    );
  }

  return (
    <div className="h-4/5 w-full flex flex-col justify-center items-center">
      <CalendarTopRow
        calendarKey={calendarKey}
        sizeState={sizeState}
        calendarOption={calendarOption}
      />
      {calendarRows}
    </div>
  );
}
