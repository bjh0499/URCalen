import React from "react";
import { useAppDispatch } from "../../../store/hooks";

import {
  deleteWidget,
  updateWidget,
} from "../../../store/slices/calendarPagesSlice";

export default function CalendarRightClickMenu({
  selectedPage,
  rightClickPosition,
  setRightClickPosition,
  setModalOption,
}) {
  const dispatch = useAppDispatch();

  const { calendarPageIdx, calendarPage } = selectedPage;
  const positionState =
    calendarPage.widgetList[rightClickPosition.key]!.position;

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
      deleteWidgetKey: rightClickPosition.key,
    };
    dispatch(deleteWidget(deleteObj));

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
      updateWidget({
        idx: calendarPageIdx,
        updateWidgetKey: rightClickPosition.key,
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
      updateWidget({
        idx: calendarPageIdx,
        updateWidgetKey: rightClickPosition.key,
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
