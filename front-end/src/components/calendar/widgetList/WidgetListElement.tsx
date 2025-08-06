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

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const clickObj = {
      key: idx,
      type: widgetType,
      clickX: e.clientX,
      clickY: e.clientY,
    };

    setRightClickPosition(() => clickObj);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setSelectedWidgetKey(idx));
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(resetSelectedWidgetKey());
  };

  let str = String(idx);
  switch (widgetType) {
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
