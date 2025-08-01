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
  contentRef,
}) {
  return (
    <article className="flex">
      <WidgetArea
        selectedPage={selectedPage}
        setRightClickPosition={setRightClickPosition}
        contentRef={contentRef}
      />
      <WidgetSidebar
        selectedPage={selectedPage}
        setRightClickPosition={setRightClickPosition}
      />
      {rightClickPosition.clickX !== undefined ? (
        rightClickPosition.type === "Calendar" ? (
          <CalendarRightClickMenu
            selectedPage={selectedPage}
            rightClickPosition={rightClickPosition}
            setRightClickPosition={setRightClickPosition}
            setModalOption={setModalOption}
          />
        ) : rightClickPosition.type === "Image" ? (
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
