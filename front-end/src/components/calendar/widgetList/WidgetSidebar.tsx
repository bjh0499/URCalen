import React from "react";
import { useState } from "react";

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
  const [widgetStartIdx, setWidgetStartIdx] = useState<number>(0);

  const handleWidgetListUpButton = (e) => {
    if (widgetStartIdx > 0) {
      setWidgetStartIdx(() => widgetStartIdx - 1);
    }
  };

  const handleWidgetListDownButton = (e) => {
    if (widgetStartIdx < selectedPage.calendarPage.widgetList.length - 10) {
      setWidgetStartIdx(() => widgetStartIdx + 1);
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
