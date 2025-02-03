import React from "react";

import NavDivButton from "./NavDivButton";

export default function Nav({
  setMonthSelector,
  calendarKeyList,
  setCalendarKeyList,
  calendarId,
  setCalendarId,
  calendarOption,
  setCalendarOption,
  calendarPosition,
  setCalendarPosition,
  calendarSize,
  setCalendarSize,
}) {
  const prevYear = () => {
    setMonthSelector((prev) => {
      return {
        year: prev.year - 1,
        month: prev.month,
      };
    });
  };
  const prevMonth = () => {
    setMonthSelector((prev) => {
      return {
        year: prev.year - (prev.month === 0),
        month: (prev.month + 11) % 12,
      };
    });
  };
  const nextMonth = () => {
    setMonthSelector((prev) => {
      return {
        year: prev.year + (prev.month === 11),
        month: (prev.month + 1) % 12,
      };
    });
  };
  const nextYear = () => {
    setMonthSelector((prev) => {
      return {
        year: prev.year + 1,
        month: prev.month,
      };
    });
  };

  const addCalendar = () => {
    setCalendarId((prev) => prev + 1);

    const addOption = JSON.parse(JSON.stringify(calendarOption));
    addOption[calendarId] = {
      lang: "KO",
    };

    const addPosition = JSON.parse(JSON.stringify(calendarPosition));
    addPosition[calendarId] = {
      x: 0,
      y: 0,
    };

    const addSize = JSON.parse(JSON.stringify(calendarSize));
    addSize[calendarId] = {
      width: 320,
      height: 320,
    };

    setCalendarOption(() => addOption);
    setCalendarPosition(() => addPosition);
    setCalendarSize(() => addSize);

    setCalendarKeyList((prev) => [...prev, calendarId]);
  };

  // TODO: 해당 함수를 통해 취합된 각 달력 속성들을 파일로 만들거나 서버로 보내는 과정 구현 필요
  const calendarInfo = () => {
    calendarKeyList.forEach((key) => {
      console.log(calendarOption[key]);
      console.log(calendarPosition[key]);
      console.log(calendarSize[key]);
    });
  };

  // TODO: 파일이나 서버에서 받은 JSON으로 달력을 재구성하는 기능 구현 필요
  const restoreCalendar = () => {};

  const buttonPropsList = [];
  buttonPropsList.push({ text: "◀◀", clickFunc: prevYear });
  buttonPropsList.push({ text: "◀", clickFunc: prevMonth });
  buttonPropsList.push({ text: "▶", clickFunc: nextMonth });
  buttonPropsList.push({ text: "▶▶", clickFunc: nextYear });
  buttonPropsList.push({ text: "+", clickFunc: addCalendar });
  buttonPropsList.push({ text: "?", clickFunc: calendarInfo });
  buttonPropsList.push({ text: "!", clickFunc: restoreCalendar });

  return (
    <div className="flex items-center">
      {buttonPropsList.map((buttonProps, idx) => (
        <NavDivButton
          key={idx}
          text={buttonProps.text}
          clickFunc={buttonProps.clickFunc}
        />
      ))}
    </div>
  );
}
