import React from "react";
import SelectedPage from "../../../class/SelectedPage";

type WidgetSidebarInput = {
  selectedPage: SelectedPage;
};

export default function WidgetSidebar({ selectedPage }: WidgetSidebarInput) {
  const { widgetKeyList, widgetList } = selectedPage.calendarPage;

  return (
    <aside className="flex-none" style={{ width: "100px" }}>
      {widgetKeyList.map((key) => {
        let str = String(key);
        switch (widgetList[key]!.widgetType) {
          case "Calendar":
            str += ": 달력";
            break;
          case "Image":
            str += ": 이미지";
            break;
          default:
            str += ": ??";
        }
        return <div>{str}</div>;
      })}
    </aside>
  );
}
