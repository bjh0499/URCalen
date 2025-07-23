import React from "react";

import WidgetArea from "./WidgetArea";
import WidgetSidebar from "../widgetList/WidgetSidebar";
import CalendarRightClickMenu from "./calendarTable/CalendarRightClickMenu";
import ImageRightClickMenu from "./imageComponent/ImageRightClickMenu";

export default function CalendarArea({
  setModalOption,
  rightClickPosition,
  setRightClickPosition,
}) {
  return (
    <article className="flex">
      <WidgetArea setRightClickPosition={setRightClickPosition} />
      <WidgetSidebar></WidgetSidebar>
      {rightClickPosition.clickX !== undefined ? (
        rightClickPosition.type === "calendar" ? (
          <CalendarRightClickMenu
            rightClickPosition={rightClickPosition}
            setRightClickPosition={setRightClickPosition}
            setModalOption={setModalOption}
          />
        ) : rightClickPosition.type === "image" ? (
          <ImageRightClickMenu
            rightClickPosition={rightClickPosition}
            setRightClickPosition={setRightClickPosition}
          />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </article>
  );
}
