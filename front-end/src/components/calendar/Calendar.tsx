import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

import { updateCalendar } from "../../store/slices/calendarPagesSlice";

import type UpdateCalendarInput from "../../class/UpdateCalendarInput";

export default function Calendar({
  calendarKey,
  holidays,
  setRightClickPosition,
}) {
  const dispatch = useAppDispatch();

  const selectedMonth = useAppSelector((state) => state.selectedMonth.month);
  const isFront = useAppSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + (!isFront ? 0 : 1);
  const calendarPage = useAppSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );
  const sizeState = calendarPage.widgetList[calendarKey]!.size;
  const positionState = calendarPage.widgetList[calendarKey]!.position;

  const handleOnResize = (e, { node, size, handle }) => {
    const sizeObj = {
      width: size.width,
      height: size.height,
    };

    const updateCalendarObj: UpdateCalendarInput = {
      idx: calendarPageIdx,
      updateCalendarKey: calendarKey,
      type: "size",
      newValue: sizeObj,
    };

    dispatch(updateCalendar(updateCalendarObj));
  };

  const handleOnResizeStop = (e, { node, size, handle }) => {
    const positionObj = {
      x: positionState!.x,
      y: positionState!.y,
    };

    if (positionObj.x + size.width > 1060) {
      positionObj.x = 1060 - size.width;
    }

    if (positionObj.y + size.height > 750) {
      positionObj.y = 750 - size.height;
    }

    const updateCalendarObj: UpdateCalendarInput = {
      idx: calendarPageIdx,
      updateCalendarKey: calendarKey,
      type: "position",
      newValue: positionObj,
    };

    setTimeout(() => {
      dispatch(updateCalendar(updateCalendarObj));
    }, 10);
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    const clickObj = {
      key: calendarKey,
      type: "calendar",
      clickX: e.clientX,
      clickY: e.clientY,
    };

    let element = e.target;

    do {
      const styleTransform = element.style.transform;

      const parts1 = /^translate\((-?\d{1,})px\)$/.exec(styleTransform);
      if (parts1) {
        clickObj.clickX = parseInt(parts1[1], 10);
        clickObj.clickY = 0;
        setRightClickPosition(() => clickObj);
        return;
      } else {
        const parts2 = /^translate\((-?\d{1,})px, (-?\d{1,})px\)$/.exec(
          styleTransform
        );

        if (parts2) {
          clickObj.clickX = parseInt(parts2[1], 10);
          clickObj.clickY = parseInt(parts2[2], 10);
          setRightClickPosition(() => clickObj);
          return;
        } else {
          element = element.parentElement;
        }
      }
    } while (element);
  };

  const handleDragStop = (e, data) => {
    const positionObj = {
      x: data.x,
      y: data.y,
    };

    const updateCalendarObj: UpdateCalendarInput = {
      idx: calendarPageIdx,
      updateCalendarKey: calendarKey,
      type: "position",
      newValue: positionObj,
    };

    dispatch(updateCalendar(updateCalendarObj));
  };

  return (
    <Draggable
      bounds="parent"
      cancel={".react-resizable-handle"}
      position={{
        x: positionState ? positionState.x : -1,
        y: positionState ? positionState.y : -1,
      }}
      onStop={handleDragStop}
    >
      <Resizable
        className="hover-handles"
        width={sizeState!.width}
        height={sizeState!.height}
        minConstraints={[320, 320]}
        maxConstraints={[1060, 750]}
        onResize={handleOnResize}
        onResizeStop={handleOnResizeStop}
      >
        <div
          className="w-full h-full"
          style={{
            width: sizeState!.width + "px",
            height: sizeState!.height + "px",
          }}
          onContextMenu={handleRightClick}
        >
          <CalendarHeader />
          <CalendarTable
            calendarKey={calendarKey}
            holidays={holidays}
            sizeState={sizeState}
          />
        </div>
      </Resizable>
    </Draggable>
  );
}
