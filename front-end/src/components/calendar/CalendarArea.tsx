import React from "react";

import WidgetArea from "./WidgetArea";
import WidgetSidebar from "./widgetList/WidgetSidebar";
import CalendarRightClickMenu from "./calendarTable/CalendarRightClickMenu";
import ImageRightClickMenu from "./imageComponent/ImageRightClickMenu";

export default function CalendarArea({
  selectedPage,
  setModalOption,
  rightClickPosition,
  setRightClickPosition,
}) {
  return (
    <article className="flex">
      <WidgetArea
        selectedPage={selectedPage}
        setRightClickPosition={setRightClickPosition}
      />
      <WidgetSidebar
        selectedPage={selectedPage}
        setRightClickPosition={setRightClickPosition}
      />
      {rightClickPosition.clickX !== undefined ? (
        rightClickPosition.type === "calendar" ? (
          <CalendarRightClickMenu
            selectedPage={selectedPage}
            rightClickPosition={rightClickPosition}
            setRightClickPosition={setRightClickPosition}
            setModalOption={setModalOption}
          />
        ) : rightClickPosition.type === "image" ? (
          <ImageRightClickMenu
            selectedPage={selectedPage}
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
