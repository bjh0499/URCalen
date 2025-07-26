import React from "react";

import WidgetListElement from "./WidgetListElement";

import type SelectedPage from "../../../class/SelectedPage";

type WidgetSidebarInput = {
  selectedPage: SelectedPage;
};

export default function WidgetSidebar({ selectedPage }: WidgetSidebarInput) {
  return (
    <aside className="flex-none" style={{ width: "100px" }}>
      {selectedPage.calendarPage.widgetKeyList.map((key) => {
        return (
          <WidgetListElement key={key} idx={key} selectedPage={selectedPage} />
        );
      })}
    </aside>
  );
}
