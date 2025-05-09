import { useState } from "react";

import Nav from "../../components/nav/Nav";
import CalendarRightClickMenu from "../../components/calendar/calendarTable/CalendarRightClickMenu";
import ImageRightClickMenu from "../../components/calendar/imageComponent/ImageRightClickMenu";

import StyleMenu from "../../components/menu/StyleMenu";
import LoginMenu from "../../components/menu/LoginMenu";
import SignUpMenu from "../../components/menu/SignUpMenu";
import SaveMenu from "../../components/menu/SaveMenu";
import GlobalOptionMenu from "../../components/menu/GlobalOptionMenu";
import CopyCalendarMenu from "../../components/menu/CopyCalendarMenu";
import CalendarArea from "../../components/calendar/CalendarArea";

export default function Home() {
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
  } else if (modalOption.type === "globalOption") {
    modalContent = <GlobalOptionMenu setModalOption={setModalOption} />;
  } else if (modalOption.type === "copyCalendar") {
    modalContent = <CopyCalendarMenu setModalOption={setModalOption} />;
  }

  return (
    <div className="grow flex-col-center w-full" onClick={handleClick}>
      <Nav setModalOption={setModalOption} />
      <CalendarArea setRightClickPosition={setRightClickPosition} />
      {rightClickPosition.clickX !== undefined ? (
        rightClickPosition.type === "calendar" ? (
          <CalendarRightClickMenu
            rightClickPosition={rightClickPosition}
            setRightClickPosition={setRightClickPosition}
            setModalOption={setModalOption}
          />
        ) : rightClickPosition.type === "image" ? (
          <ImageRightClickMenu
            rightClickPosition={rightClickPosition}
            setRightClickPosition={setRightClickPosition}
          />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      {modalContent}
    </div>
  );
}
