import React from "react";
import { useState } from "react";

import Nav from "./nav/Nav";
import Calendar from "./calendar/Calendar";
import loadHolidays from "../../utils/loadHolidays";
import CalendarMenu from "./calendar/calendarTable/CalendarMenu";

import StyleMenu from "./menu/StyleMenu.jsx";
import LoginMenu from "./menu/LoginMenu.jsx";
import SignUpMenu from "./menu/SignUpMenu.jsx";
import SaveMenu from "./menu/SaveMenu.jsx";

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

  // TODO: 공통적으로 가운데에 팝업 형식으로 뜨는 아래 메뉴들을 한 Logic으로 처리할 수 있도록 통합하는 작업 필요
  const [styleMenu, setStyleMenu] = useState(null);
  const [loginMenu, setLoginMenu] = useState(false);
  const [signUpMenu, setSignUpMenu] = useState(false);
  const [saveMenu, setSaveMenu] = useState(false);

  const [calendarOption, setCalendarOption] = useState({});
  const [calendarPosition, setCalendarPosition] = useState({});
  const [calendarSize, setCalendarSize] = useState({});

  const handleClick = () => {
    if (rightClickPosition.clickX !== undefined) {
      setRightClickPosition(() => ({}));
    }

    if (styleMenu) {
      setStyleMenu(() => null);
    }

    if (loginMenu) {
      setLoginMenu(() => false);
    }

    if (signUpMenu) {
      setSignUpMenu(() => false);
    }

    if (saveMenu) {
      setSaveMenu(() => false);
    }
  };

  return (
    <div className="w-screen h-screen" onClick={handleClick}>
      <Nav
        setMonthSelector={setMonthSelector}
        setLoginMenu={setLoginMenu}
        setSignUpMenu={setSignUpMenu}
        setSaveMenu={setSaveMenu}
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
          clickX={rightClickPosition.clickX}
          clickY={rightClickPosition.clickY}
          calendarX={rightClickPosition.calendarX}
          calendarY={rightClickPosition.calendarY}
          calendarKey={rightClickPosition.key}
          setCalendarKeyList={setCalendarKeyList}
          setRightClickPosition={setRightClickPosition}
          setStyleMenu={setStyleMenu}
          setCalendarOption={setCalendarOption}
        />
      ) : (
        <></>
      )}
      {styleMenu ? (
        <StyleMenu
          calendarKey={styleMenu.calendarKey}
          calendarOption={calendarOption}
          setCalendarOption={setCalendarOption}
        />
      ) : (
        <></>
      )}
      {loginMenu ? <LoginMenu setLoginMenu={setLoginMenu} /> : <></>}
      {signUpMenu ? <SignUpMenu setSignUpMenu={setSignUpMenu} /> : <></>}
      {saveMenu ? (
        <SaveMenu
          setSaveMenu={setSaveMenu}
          calendarKeyList={calendarKeyList}
          calendarOption={calendarOption}
          calendarPosition={calendarPosition}
          calendarSize={calendarSize}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
