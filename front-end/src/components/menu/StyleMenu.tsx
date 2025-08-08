import React from "react";
import { useAppDispatch } from "../../store/hooks";

import Modal from "../utils/Modal";

import { updateWidget } from "../../store/slices/calendarPagesSlice";

import type UpdateWidgetInput from "../../class/UpdateWidgetInput";
import type CalendarOption from "../../class/CalendarOption";
import type SelectedPage from "../../class/SelectedPage";

type StyleMenuInput = {
  calendarKey: number;
  selectedPage: SelectedPage;
};

export default function StyleMenu({
  calendarKey,
  selectedPage,
}: StyleMenuInput) {
  const dispatch = useAppDispatch();

  const { calendarPageIdx, calendarPage } = selectedPage;

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const calendarThisOption = calendarPage.widgetList[calendarKey]!
      .option as CalendarOption;
    let langValue: "KO" | "EN";

    if (calendarThisOption.lang === undefined) {
      langValue = "EN";
    } else {
      langValue = calendarThisOption.lang === "KO" ? "EN" : "KO";
    }

    const optionObj: CalendarOption = {
      lang: langValue,
    };

    const updateCalendarObj: UpdateWidgetInput = {
      idx: calendarPageIdx,
      updateWidgetKey: calendarKey,
      type: "option",
      newValue: optionObj,
    };

    dispatch(updateWidget(updateCalendarObj));
  };

  return (
    <Modal>
      <div onClick={handleItemClick}>언어 변경</div>
    </Modal>
  );
}
