import CalendarCell from "./CalendarCell";

export default function CalendarRow({
  calendarKey,
  dayList,
  monthSelector,
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
        monthSelector={monthSelector}
        holidays={holidays}
        sizeState={sizeState}
      />
    );
  });

  return <div className="flex-center h-1/6 w-full">{calendarCells}</div>;
}
