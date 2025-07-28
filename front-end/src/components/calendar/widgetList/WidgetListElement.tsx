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
  setRightClickPosition: any;
};

export default function WidgetListElement({
  idx,
  selectedPage,
  setRightClickPosition,
}: WidgetListElementInput) {
  const dispatch = useAppDispatch();
  const widgetType = selectedPage.calendarPage.widgetList[idx]!.widgetType;

  const handleRightClick = (e) => {
    e.preventDefault();

    let type;
    switch (widgetType) {
      case "Calendar":
        type = "calendar";
        break;
      case "Image":
        type = "image";
        break;
      default:
        break;
    }

    const clickObj = {
      key: idx,
      type: type,
      clickX: e.clientX,
      clickY: e.clientY,
    };

    setRightClickPosition(() => clickObj);
  };

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
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleRightClick}
    >
      {str}
    </div>
  );
}
