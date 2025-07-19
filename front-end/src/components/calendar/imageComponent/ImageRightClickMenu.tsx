import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import {
  updateWidget,
  deleteWidget,
} from "../../../store/slices/calendarPagesSlice";

import DeleteWidgetInput from "../../../class/DeleteWidgetInput";

export default function ImageRightClickMenu({
  rightClickPosition,
  setRightClickPosition,
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
    const deleteObj: DeleteWidgetInput = {
      idx: calendarPageIdx,
      deleteWidgetKey: rightClickPosition.key,
    };
    dispatch(deleteWidget(deleteObj));

    setRightClickPosition(() => ({}));
  };

  const handleItemClick2 = () => {
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

  const handleItemClick3 = () => {
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
      <div onClick={handleItemClick}>이미지 삭제</div>
      <div>현재 높이: {positionState.z}</div>
      <div onClick={handleItemClick2}>높이 증가</div>
      <div onClick={handleItemClick3}>높이 감소</div>
    </div>
  );
}
