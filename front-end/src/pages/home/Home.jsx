import { useState } from "react";
import { useSelector } from "react-redux";

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
  const holidays = loadHolidays();

  // TODO: 달 선택에 따라 변경되는 구성으로 개조 중이므로, 아래 내용은 year를 제외하고 삭제 예정
  const today = new Date();
  const [monthSelector, setMonthSelector] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const [rightClickPosition, setRightClickPosition] = useState({});

  const [modalOption, setModalOption] = useState({});

  const handleClick = () => {
    if (rightClickPosition.clickX !== undefined) {
      setRightClickPosition(() => ({}));
    }

    if (modalOption.type !== undefined) {
      setModalOption(() => ({}));
    }
  };

  let modalContent = <></>;

  if (modalOption.type === "style") {
    modalContent = <StyleMenu calendarKey={modalOption.modalArg.calendarKey} />;
  } else if (modalOption.type === "login") {
    modalContent = <LoginMenu setModalOption={setModalOption} />;
  } else if (modalOption.type === "signup") {
    modalContent = <SignUpMenu setModalOption={setModalOption} />;
  } else if (modalOption.type === "save") {
    modalContent = <SaveMenu setModalOption={setModalOption} />;
  }

  const selectedMonth = useSelector((state) => state.selectedMonth.month);
  const isFront = useSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + !isFront;
  const calendarPage = useSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );

  return (
    <div className="w-full h-full" onClick={handleClick}>
      <Nav
        setMonthSelector={setMonthSelector}
        setModalOption={setModalOption}
      />
      {calendarPage.calendarKeyList.map((key) => (
        <Calendar
          key={key}
          calendarKey={key}
          monthSelector={monthSelector}
          holidays={holidays}
          setRightClickPosition={setRightClickPosition}
        />
      ))}
      {rightClickPosition.clickX !== undefined ? (
        <CalendarMenu
          rightClickPosition={rightClickPosition}
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
