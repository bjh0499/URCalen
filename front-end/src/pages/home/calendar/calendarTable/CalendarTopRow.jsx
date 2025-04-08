import CalendarTopCell from "./CalendarTopCell";

export default function CalendarTopRow({
  calendarKey,
  sizeState,
  calendarOption,
}) {
  const calendarThisOption = calendarOption[calendarKey];
  const dayArr =
    calendarThisOption && calendarThisOption.lang === "EN"
      ? ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
      : ["일", "월", "화", "수", "목", "금", "토"];
  const calendarTopCells = [];

  dayArr.forEach((day, i) => {
    calendarTopCells.push(
      <CalendarTopCell
        key={i}
        idx={i}
        day={day}
        sizeState={sizeState}
        calendarOption={calendarOption}
      />
    );
  });

  return (
    <div className="h-1/6 w-full flex jusfity-center items-center">
      {calendarTopCells}
    </div>
  );
}
