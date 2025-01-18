import React from "react";

import NavDivButton from "./NavDivButton";

export default function Nav({
  setMonthSelector,
  setCalendarKeyList,
  calendarId,
  setCalendarId,
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
    setCalendarKeyList((prev) => [...prev, calendarId + 1]);
    setCalendarId((prev) => prev + 1);
  };

  const buttonPropsList = [];
  buttonPropsList.push({ text: "◀◀", clickFunc: prevYear });
  buttonPropsList.push({ text: "◀", clickFunc: prevMonth });
  buttonPropsList.push({ text: "▶", clickFunc: nextMonth });
  buttonPropsList.push({ text: "▶▶", clickFunc: nextYear });
  buttonPropsList.push({ text: "+", clickFunc: addCalendar });

  return (
    <div className="flex items-center">
      {buttonPropsList.map((buttonProps) => (
        <NavDivButton
          text={buttonProps.text}
          clickFunc={buttonProps.clickFunc}
        />
      ))}
    </div>
  );
}
