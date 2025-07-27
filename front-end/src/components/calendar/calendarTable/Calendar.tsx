import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

import CalendarHeader from "../calendarHeader/CalendarHeader";
import CalendarTable from "./CalendarTable";

import { updateWidget } from "../../../store/slices/calendarPagesSlice";

import type UpdateWidgetInput from "../../../class/UpdateWidgetInput";

export default function Calendar({
  calendarKey,
  holidays,
  selectedMonth,
  calendarPageIdx,
  calendarPage,
  setRightClickPosition,
}) {
  const dispatch = useAppDispatch();

  const selectedYear = useAppSelector((state) => state.selectedMonth.year);

  const sizeState = calendarPage.widgetList[calendarKey]!.size;
  const positionState = calendarPage.widgetList[calendarKey]!.position;

  const handleOnResize = (e, { node, size, handle }) => {
    const sizeObj = {
      width: size.width,
      height: size.height,
    };

    const updateCalendarObj: UpdateWidgetInput = {
      idx: calendarPageIdx,
      updateWidgetKey: calendarKey,
      type: "size",
      newValue: sizeObj,
    };

    dispatch(updateWidget(updateCalendarObj));
  };

  const handleOnResizeStop = (e, { node, size, handle }) => {
    const positionObj = {
      x: positionState.x,
      y: positionState.y,
      z: positionState.z,
    };

    if (positionObj.x + size.width > 1060) {
      positionObj.x = 1060 - size.width;
    }

    if (positionObj.y + size.height > 750) {
      positionObj.y = 750 - size.height;
    }

    const updateCalendarObj: UpdateWidgetInput = {
      idx: calendarPageIdx,
      updateWidgetKey: calendarKey,
      type: "position",
      newValue: positionObj,
    };

    setTimeout(() => {
      dispatch(updateWidget(updateCalendarObj));
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
        setRightClickPosition(() => clickObj);
        return;
      } else {
        const parts2 = /^translate\((-?\d{1,})px, (-?\d{1,})px\)$/.exec(
          styleTransform
        );

        if (parts2) {
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
      z: positionState.z,
    };

    const updateCalendarObj: UpdateWidgetInput = {
      idx: calendarPageIdx,
      updateWidgetKey: calendarKey,
      type: "position",
      newValue: positionObj,
    };

    dispatch(updateWidget(updateCalendarObj));
  };

  const { selectedWidgetKey } = useAppSelector((state) => state.selectedWidget);
  const classNameStr = `w-full h-full border ${
    selectedWidgetKey === calendarKey ? "border-black" : "border-white"
  }`;

  return (
    <Draggable
      bounds="parent"
      cancel={".react-resizable-handle"}
      position={{
        x: positionState.x,
        y: positionState.y,
      }}
      onStop={handleDragStop}
    >
      <Resizable
        className="hover-handles"
        width={sizeState.width}
        height={sizeState.height}
        minConstraints={[320, 320]}
        maxConstraints={[1060, 750]}
        onResize={handleOnResize}
        onResizeStop={handleOnResizeStop}
      >
        <div
          className={classNameStr}
          style={{
            width: sizeState.width + "px",
            height: sizeState.height + "px",
            zIndex: positionState.z,
          }}
          onContextMenu={handleRightClick}
        >
          <CalendarHeader
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
          />
          <CalendarTable
            calendarKey={calendarKey}
            holidays={holidays}
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            calendarPage={calendarPage}
            sizeState={sizeState}
          />
        </div>
      </Resizable>
    </Draggable>
  );
}
