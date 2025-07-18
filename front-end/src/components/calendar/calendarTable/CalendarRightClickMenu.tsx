import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import {
  deleteCalendar,
  updateCalendar,
} from "../../../store/slices/calendarPagesSlice";

export default function CalendarRightClickMenu({
  rightClickPosition,
  setRightClickPosition,
  setModalOption,
}) {
  const dispatch = useAppDispatch();

  const selectedMonth = useAppSelector((state) => state.selectedMonth.month);
  const isFront = useAppSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + (isFront ? 0 : 1);
  const positionState = useAppSelector(
    (state) =>
      state.calendarPages.calendarPages[calendarPageIdx].widgetList[
        rightClickPosition.key
      ]!.position
  );

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMenuRightClick = (e) => {
    e.preventDefault();
  };

  const handleItemClick = () => {
    const deleteObj = {
      idx: calendarPageIdx,
      deleteCalendarKey: rightClickPosition.key,
    };
    dispatch(deleteCalendar(deleteObj));

    setRightClickPosition(() => ({}));
  };

  const handleItemClick2 = () => {
    setModalOption(() => ({
      type: "style",
      modalArg: {
        calendarKey: rightClickPosition.key,
      },
    }));
    setRightClickPosition(() => ({}));
  };

  const handleItemClick3 = () => {
    const positionObj = {
      x: positionState.x,
      y: positionState.y,
      z: positionState.z + (positionState.z == 20 ? 0 : 1),
    };
    dispatch(
      updateCalendar({
        idx: calendarPageIdx,
        updateCalendarKey: rightClickPosition.key,
        type: "position",
        newValue: positionObj,
      })
    );
  };

  const handleItemClick4 = () => {
    const positionObj = {
      x: positionState.x,
      y: positionState.y,
      z: positionState.z - (positionState.z == 0 ? 0 : 1),
    };
    dispatch(
      updateCalendar({
        idx: calendarPageIdx,
        updateCalendarKey: rightClickPosition.key,
        type: "position",
        newValue: positionObj,
      })
    );
  };

  return (
    <div
      className="menu-box bg-slate-100"
      style={{
        position: "absolute",
        left: `${rightClickPosition.clickX}px`,
        top: `${rightClickPosition.clickY}px`,
        zIndex: "100",
      }}
      onClick={handleMenuClick}
      onContextMenu={handleMenuRightClick}
    >
      <div onClick={handleItemClick}>달력 삭제</div>
      <div onClick={handleItemClick2}>달력 스타일</div>
      <div>현재 높이: {positionState.z}</div>
      <div onClick={handleItemClick3}>높이 증가</div>
      <div onClick={handleItemClick4}>높이 감소</div>
    </div>
  );
}
