import React from "react";

import NavDivButton from "./NavDivButton";

export default function Nav({
  setMonthSelector,
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

  const buttonPropsList = [];
  buttonPropsList.push({ text: "◀◀", clickFunc: prevYear });
  buttonPropsList.push({ text: "◀", clickFunc: prevMonth });
  buttonPropsList.push({ text: "▶", clickFunc: nextMonth });
  buttonPropsList.push({ text: "▶▶", clickFunc: nextYear });
  buttonPropsList.push({ text: "+", clickFunc: addCalendar });

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
