import React from "react";
import { useState } from "react";

import { useAppSelector } from "../../store/hooks";

import Nav from "../../components/nav/Nav";

import StyleMenu from "../../components/menu/StyleMenu";
import LoginMenu from "../../components/menu/LoginMenu";
import SignUpMenu from "../../components/menu/SignUpMenu";
import SaveMenu from "../../components/menu/SaveMenu";
import GlobalOptionMenu from "../../components/menu/GlobalOptionMenu";
import CopyCalendarMenu from "../../components/menu/CopyCalendarMenu";

import CalendarArea from "../../components/calendar/CalendarArea";

import type ClickPosition from "../../class/ClickPosition";
import type ModalOption from "../../class/ModalOption";
import type SelectedPage from "../../class/SelectedPage";

export default function Home() {
  const [rightClickPosition, setRightClickPosition] = useState<ClickPosition>(
    {}
  );

  const [modalOption, setModalOption] = useState<ModalOption>({});

  const handleClick = () => {
    if (rightClickPosition.clickX !== undefined) {
      setRightClickPosition(() => ({}));
    }

    if (modalOption.type !== undefined) {
      setModalOption(() => ({}));
    }
  };

  const selectedYear = useAppSelector((state) => state.selectedMonth.year);
  const selectedMonth = useAppSelector((state) => state.selectedMonth.month);
  const isFront = useAppSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + (isFront ? 0 : 1);
  const calendarPage = useAppSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );

  const selectedPage: SelectedPage = {
    selectedYear,
    selectedMonth,
    isFront,
    calendarPageIdx,
    calendarPage,
  };

  let modalContent = <></>;

  if (modalOption.type === "style") {
    modalContent = (
      <StyleMenu
        calendarKey={modalOption.modalArg.calendarKey}
        selectedPage={selectedPage}
      />
    );
  } else if (modalOption.type === "login") {
    modalContent = <LoginMenu setModalOption={setModalOption} />;
  } else if (modalOption.type === "signup") {
    modalContent = <SignUpMenu setModalOption={setModalOption} />;
  } else if (modalOption.type === "save") {
    modalContent = <SaveMenu setModalOption={setModalOption} />;
  } else if (modalOption.type === "globalOption") {
    modalContent = <GlobalOptionMenu setModalOption={setModalOption} />;
  } else if (modalOption.type === "copyCalendar") {
    modalContent = <CopyCalendarMenu setModalOption={setModalOption} />;
  }

  return (
    <main className="grow flex-col-center w-full" onClick={handleClick}>
      <Nav setModalOption={setModalOption} selectedPage={selectedPage} />
      <CalendarArea
        selectedPage={selectedPage}
        rightClickPosition={rightClickPosition}
        setRightClickPosition={setRightClickPosition}
        setModalOption={setModalOption}
      />
      {modalContent}
    </main>
  );
}
