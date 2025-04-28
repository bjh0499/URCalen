import { useSelector } from "react-redux";

import loadHolidays from "../../utils/loadHolidays";

import Calendar from "./Calendar";

export default function CalendarArea({ setRightClickPosition }) {
  // TODO: 임시로 공휴일 정보를 해당 함수에서 지정하지만, 실제 배포 시에는 서버에서 받을 방침
  const holidays = loadHolidays();

  const selectedMonth = useSelector((state) => state.selectedMonth.month);
  const isFront = useSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + !isFront;
  const calendarPage = useSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );
  const isChanged = useSelector((state) => state.selectedMonth.isChanged);

  return (
    <div className="flex-center grow w-full">
      <div className="flex m-auto" style={{ height: "750px", width: "1060px" }}>
        {!isChanged &&
          calendarPage.calendarKeyList.map((key) => (
            <Calendar
              key={key}
              calendarKey={key}
              holidays={holidays}
              setRightClickPosition={setRightClickPosition}
            />
          ))}
      </div>
    </div>
  );
}
