import React from "react";
import { useAppDispatch } from "../../../store/hooks";

import {
  setSelectedWidgetKey,
  resetSelectedWidgetKey,
} from "../../../store/slices/selectedWidgetSlice";

import type SelectedPage from "../../../class/SelectedPage";

type WidgetListElementInput = {
  idx: number;
  selectedPage: SelectedPage;
};

export default function WidgetListElement({
  idx,
  selectedPage,
}: WidgetListElementInput) {
  const dispatch = useAppDispatch();

  const handleMouseEnter = (e) => {
    dispatch(setSelectedWidgetKey(idx));
  };

  const handleMouseLeave = (e) => {
    dispatch(resetSelectedWidgetKey());
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
