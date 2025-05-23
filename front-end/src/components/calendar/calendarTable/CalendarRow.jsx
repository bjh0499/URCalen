import CalendarCell from "./CalendarCell";

export default function CalendarRow({
  dayList,
  monthSelector,
  holidays,
  sizeState,
  calendarOption,
}) {
  let calendarCells = [];
  dayList.forEach((dayObj, i) => {
    calendarCells.push(
      <CalendarCell
        key={i}
        dayObj={dayObj}
        monthSelector={monthSelector}
        holidays={holidays}
        sizeState={sizeState}
        calendarOption={calendarOption}
      />
    );
  });

  return <div className="flex-center h-1/6 w-full">{calendarCells}</div>;
}
