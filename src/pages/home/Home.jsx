import React from "react";
import { useState } from "react";

import Nav from "./nav/Nav";
import Calendar from "./calendar/Calendar";
import loadHolidays from "../../utils/loadHolidays";
import CalendarMenu from "./calendar/calendarTable/CalendarMenu";

export default function Home() {
  // TODO: 임시로 공휴일 정보를 해당 함수에서 지정하지만, 실제 배포 시에는 서버에서 받을 방침
  let holidays = loadHolidays();

  let today = new Date();
  const [monthSelector, setMonthSelector] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const [calendarKeyList, setCalendarKeyList] = useState([]);
  const [calendarId, setCalendarId] = useState(0);
  const [rightClickPosition, setRightClickPosition] = useState({});

  const handleClick = () => {
    if (rightClickPosition.clickX !== undefined) {
      setRightClickPosition(() => ({}));
    }
  };

  return (
    <div className="w-screen h-screen" onClick={handleClick}>
      <Nav
        setMonthSelector={setMonthSelector}
        setCalendarKeyList={setCalendarKeyList}
        calendarId={calendarId}
        setCalendarId={setCalendarId}
      />
      {calendarKeyList.map((key) => (
        <Calendar
          key={key}
          calendarKey={key}
          monthSelector={monthSelector}
          holidays={holidays}
          calendarKeyList={calendarKeyList}
          setCalendarKeyList={setCalendarKeyList}
          setRightClickPosition={setRightClickPosition}
        />
      ))}
      {rightClickPosition.clickX !== undefined ? (
        <CalendarMenu
          clickX={rightClickPosition.clickX}
          clickY={rightClickPosition.clickY}
          calendarX={rightClickPosition.calendarX}
          calendarY={rightClickPosition.calendarY}
          calendarKey={rightClickPosition.key}
          setCalendarKeyList={setCalendarKeyList}
          setRightClickPosition={setRightClickPosition}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
