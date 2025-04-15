import { useSelector } from "react-redux";

import CalendarTopCell from "./CalendarTopCell";

export default function CalendarTopRow({
  calendarKey,
  sizeState,
  calendarOption,
}) {
  const selectedMonth = useSelector((state) => state.selectedMonth.month);
  const isFront = useSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + !isFront;
  const calendarPage = useSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );

  const calendarThisOption = calendarPage.calendarOption[calendarKey];
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
        calendarKey={calendarKey}
        day={day}
        sizeState={sizeState}
        calendarOption={calendarOption}
      />
    );
  });

  return <div className="flex-center h-1/6 w-full">{calendarTopCells}</div>;
}
