import React from "react";
import { useAppDispatch } from "../../../store/hooks";

import {
  updateWidget,
  deleteWidget,
} from "../../../store/slices/calendarPagesSlice";

import type DeleteWidgetInput from "../../../class/DeleteWidgetInput";
import type SelectedPage from "../../../class/SelectedPage";
import type ClickPosition from "../../../class/ClickPosition";

type ImageRightClickMenuInput = {
  selectedPage: SelectedPage;
  rightClickPosition: ClickPosition;
  setRightClickPosition: React.Dispatch<React.SetStateAction<ClickPosition>>;
};

export default function ImageRightClickMenu({
  selectedPage,
  rightClickPosition,
  setRightClickPosition,
}: ImageRightClickMenuInput) {
  const dispatch = useAppDispatch();

  const { calendarPageIdx, calendarPage } = selectedPage;
  const positionState =
    calendarPage.widgetList[rightClickPosition.key!]!.position;

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMenuRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleItemClick = () => {
    const deleteObj: DeleteWidgetInput = {
      idx: calendarPageIdx,
      deleteWidgetKey: rightClickPosition.key!,
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
        updateWidgetKey: rightClickPosition.key!,
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
        updateWidgetKey: rightClickPosition.key!,
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
