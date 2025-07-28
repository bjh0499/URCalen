import React from "react";

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
  return (
    <aside className="flex-none" style={{ width: "100px" }}>
      {selectedPage.calendarPage.widgetKeyList.map((key) => {
        return (
          <WidgetListElement
            key={key}
            idx={key}
            selectedPage={selectedPage}
            setRightClickPosition={setRightClickPosition}
          />
        );
      })}
    </aside>
  );
}
