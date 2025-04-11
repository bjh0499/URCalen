import { useState } from "react";

import Nav from "../../components/nav/Nav";
import Calendar from "../../components/calendar/Calendar";
import loadHolidays from "../../utils/loadHolidays";
import CalendarMenu from "../../components/calendar/calendarTable/CalendarMenu";

import StyleMenu from "../../components/menu/StyleMenu";
import LoginMenu from "../../components/menu/LoginMenu";
import SignUpMenu from "../../components/menu/SignUpMenu";
import SaveMenu from "../../components/menu/SaveMenu";

export default function Home() {
  // TODO: 임시로 공휴일 정보를 해당 함수에서 지정하지만, 실제 배포 시에는 서버에서 받을 방침
  let holidays = loadHolidays();

  // TODO: 달 선택에 따라 변경되는 구성으로 개조 중이므로, 아래 내용은 year를 제외하고 삭제 예정
  let today = new Date();
  const [monthSelector, setMonthSelector] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const [rightClickPosition, setRightClickPosition] = useState({});

  const [modalOption, setModalOption] = useState({});

  const [calendarKeyList, setCalendarKeyList] = useState([]);
  const [calendarId, setCalendarId] = useState(0);
  const [calendarOption, setCalendarOption] = useState({});
  const [calendarPosition, setCalendarPosition] = useState({});
  const [calendarSize, setCalendarSize] = useState({});

  const handleClick = () => {
    setRightClickPosition(() => ({}));
    setModalOption(() => ({}));
  };

  let modalContent = <></>;

  if (modalOption.type === "style") {
    modalContent = (
      <StyleMenu
        calendarKey={modalOption.modalArg.calendarKey}
        calendarOption={calendarOption}
        setCalendarOption={setCalendarOption}
      />
    );
  } else if (modalOption.type === "login") {
    modalContent = <LoginMenu setModalOption={setModalOption} />;
  } else if (modalOption.type === "signup") {
    modalContent = <SignUpMenu setModalOption={setModalOption} />;
  } else if (modalOption.type === "save") {
    modalContent = (
      <SaveMenu
        setModalOption={setModalOption}
        calendarKeyList={calendarKeyList}
        calendarOption={calendarOption}
        calendarPosition={calendarPosition}
        calendarSize={calendarSize}
      />
    );
  }

  return (
    <div className="w-full h-full" onClick={handleClick}>
      <Nav
        setMonthSelector={setMonthSelector}
        setModalOption={setModalOption}
        setCalendarKeyList={setCalendarKeyList}
        calendarId={calendarId}
        setCalendarId={setCalendarId}
        calendarOption={calendarOption}
        setCalendarOption={setCalendarOption}
        calendarPosition={calendarPosition}
        setCalendarPosition={setCalendarPosition}
        calendarSize={calendarSize}
        setCalendarSize={setCalendarSize}
      />
      {calendarKeyList.map((key) => (
        <Calendar
          key={key}
          calendarKey={key}
          monthSelector={monthSelector}
          holidays={holidays}
          calendarOption={calendarOption}
          setRightClickPosition={setRightClickPosition}
          calendarPosition={calendarPosition}
          setCalendarPosition={setCalendarPosition}
          calendarSize={calendarSize}
          setCalendarSize={setCalendarSize}
        />
      ))}
      {rightClickPosition.clickX !== undefined ? (
        <CalendarMenu
          rightClickPosition={rightClickPosition}
          setCalendarKeyList={setCalendarKeyList}
          setRightClickPosition={setRightClickPosition}
          setModalOption={setModalOption}
        />
      ) : (
        <></>
      )}
      {modalContent}
    </div>
  );
}
