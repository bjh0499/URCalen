import React from "react";
import { useAppSelector } from "../../store/hooks";

import loadHolidays from "../../utils/loadHolidays";

import Calendar from "./calendarTable/Calendar";
import ImageComponent from "./imageComponent/ImageComponent";

export default function WidgetArea({
  selectedPage,
  setRightClickPosition,
  contentRef,
}) {
  // TODO: 임시로 공휴일 정보를 해당 함수에서 지정하지만, 실제 배포 시에는 서버에서 받을 방침
  const holidays = loadHolidays();

  const { selectedMonth, calendarPageIdx, calendarPage } = selectedPage;
  const isChanged = useAppSelector((state) => state.selectedMonth.isChanged);

  return (
    <div className="flex-center grow w-full">
      <div
        className="relative flex m-auto"
        style={{ height: "750px", width: "1060px" }}
        ref={contentRef}
      >
        {!isChanged &&
          calendarPage.widgetKeyList.map((key) => {
            switch (calendarPage.widgetList[key]!.widgetType) {
              case "Image":
                return (
                  <ImageComponent
                    key={key}
                    imageId={key}
                    calendarPageIdx={calendarPageIdx}
                    calendarPage={calendarPage}
                    setRightClickPosition={setRightClickPosition}
                  />
                );
              case "Calendar":
                return (
                  <Calendar
                    key={key}
                    calendarKey={key}
                    holidays={holidays}
                    selectedMonth={selectedMonth}
                    calendarPageIdx={calendarPageIdx}
                    calendarPage={calendarPage}
                    setRightClickPosition={setRightClickPosition}
                  />
                );
              default:
                break;
            }
          })}
      </div>
    </div>
  );
}
