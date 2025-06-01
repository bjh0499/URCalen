import CalendarCell from "./CalendarCell";

export default function CalendarRow({
  calendarKey,
  dayList,
  holidays,
  sizeState,
}) {
  let calendarCells = [];
  dayList.forEach((dayObj, i) => {
    calendarCells.push(
      <CalendarCell
        key={i}
        calendarKey={calendarKey}
        dayObj={dayObj}
        holidays={holidays}
        sizeState={sizeState}
      />
    );
  });

  return <div className="flex-center h-1/6 w-full">{calendarCells}</div>;
}
