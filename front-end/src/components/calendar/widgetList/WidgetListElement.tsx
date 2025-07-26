import React from "react";

import type SelectedPage from "../../../class/SelectedPage";

type WidgetListElementInput = {
  idx: number;
  selectedPage: SelectedPage;
};

export default function WidgetListElement({
  idx,
  selectedPage,
}: WidgetListElementInput) {
  const handleMouseEnter = (e) => {
    console.log(idx + " O");
  };

  const handleMouseLeave = (e) => {
    console.log(idx + " X");
  };

  let str = String(idx);
  switch (selectedPage.calendarPage.widgetList[idx]!.widgetType) {
    case "Calendar":
      str += ": 달력";
      break;
    case "Image":
      str += ": 이미지";
      break;
    default:
      str += ": ??";
  }
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {str}
    </div>
  );
}
