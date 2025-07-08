import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import Modal from "../utils/Modal";

import { updateCalendar } from "../../store/slices/calendarPagesSlice";
import UpdateCalendarInput from "../../class/UpdateCalendarInput";
import CalendarOption from "../../class/CalendarOption";

export default function StyleMenu({ calendarKey }) {
  const dispatch = useAppDispatch();

  const selectedMonth = useAppSelector((state) => state.selectedMonth.month);
  const isFront = useAppSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + (isFront ? 0 : 1);
  const calendarPage = useAppSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );

  const handleItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const calendarThisOption = calendarPage.widgetList[calendarKey]!
      .option as CalendarOption;
    let langValue;

    if (calendarThisOption.lang === undefined) {
      langValue = "EN";
    } else {
      langValue = calendarThisOption.lang === "KO" ? "EN" : "KO";
    }

    const optionObj: CalendarOption = {
      lang: langValue,
    };

    const updateCalendarObj: UpdateCalendarInput = {
      idx: calendarPageIdx,
      updateCalendarKey: calendarKey,
      type: "option",
      newValue: optionObj,
    };

    dispatch(updateCalendar(updateCalendarObj));
  };

  return (
    <Modal>
      <div onClick={handleItemClick}>언어 변경</div>
    </Modal>
  );
}
