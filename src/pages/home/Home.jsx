import React, { useEffect } from "react";
import { useState } from "react";

import Nav from "./nav/Nav";
import Calendar from "./calendar/Calendar";
import loadHolidays from "../../utils/loadHolidays";

export default function Home() {
  // TODO: 임시로 공휴일 정보를 해당 함수에서 지정하지만, 실제 배포 시에는 서버에서 받을 방침
  let holidays = loadHolidays();

  let today = new Date();
  const [monthSelector, setMonthSelector] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const [calendars, setCalendars] = useState([]);
  const [calendarId, setCalendarId] = useState(0);

  // State 내 List에 저장된 Calendar들에 State를 통한 달 변경이 적용되도록 하는 부분
  // 출처: ChatGPT
  // TODO: Calendar 객체가 새로 생성되는 것처럼 보이는데 위치와 크기 정보가 유지되는 것이 의문
  // 위치와 크기 정보는 외부적으로 관리되는 것인지?
  // 만일 그렇다면 추후 추가될 삭제 부분에서 잠재적 버그 위험성이 존재할 수 있음
  useEffect(() => {
    setCalendars((calendars) =>
      calendars.map((el) => (
        <Calendar
          key={el.key}
          monthSelector={monthSelector}
          holidays={holidays}
        />
      ))
    );
  }, [monthSelector]);

  // HACK: Calendar에서 1px 이미지를 불러올 때, 바로 불러오면 첫 드래그에서는 엉뚱한 아이콘이 나타남
  // 따라서 부득이하게 1px 이미지를 HTML 상에서 로딩하게 함
  return (
    <div className="w-screen h-screen">
      <Nav
        monthSelector={monthSelector}
        setMonthSelector={setMonthSelector}
        calendars={calendars}
        setCalendars={setCalendars}
        calendarId={calendarId}
        setCalendarId={setCalendarId}
        holidays={holidays}
      />
      {calendars}
      <img className="hidden" id="1px" src="/1px.png" />
    </div>
  );
}
