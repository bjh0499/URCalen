import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { setStartWidgetIdx } from "../../../store/slices/selectedWidgetSlice";

import WidgetListElement from "./WidgetListElement";

import type SelectedPage from "../../../class/SelectedPage";

type WidgetSidebarInput = {
  selectedPage: SelectedPage;
  setRightClickPosition: any;
};

export default function WidgetSidebar({
  selectedPage,
  setRightClickPosition,
}: WidgetSidebarInput) {
  const dispatch = useAppDispatch();

  const widgetStartIdx = useAppSelector(
    (state) => state.selectedWidget.startWidgetIdx
  );

  const handleWidgetListUpButton = () => {
    if (widgetStartIdx > 0) {
      dispatch(setStartWidgetIdx(widgetStartIdx - 1));
    }
  };

  const handleWidgetListDownButton = () => {
    if (widgetStartIdx < selectedPage.calendarPage.widgetList.length - 10) {
      dispatch(setStartWidgetIdx(widgetStartIdx + 1));
    }
  };

  return (
    <aside className="flex-none" style={{ width: "100px" }}>
      <div onClick={handleWidgetListUpButton}>Up</div>
      {selectedPage.calendarPage.widgetKeyList.map((key, idx) => {
        if (idx >= widgetStartIdx && idx < widgetStartIdx + 10) {
          return (
            <WidgetListElement
              key={key}
              idx={key}
              selectedPage={selectedPage}
              setRightClickPosition={setRightClickPosition}
            />
          );
        } else {
          return <></>;
        }
      })}
      <div onClick={handleWidgetListDownButton}>Down</div>
    </aside>
  );
}
