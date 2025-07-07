import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { deleteImage } from "../../../store/slices/calendarPagesSlice";

import DeleteImageInput from "../../../class/DeleteImageInput";

export default function ImageRightClickMenu({
  rightClickPosition,
  setRightClickPosition,
}) {
  const dispatch = useAppDispatch();

  const selectedMonth = useAppSelector((state) => state.selectedMonth.month);
  const isFront = useAppSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + (isFront ? 0 : 1);

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMenuRightClick = (e) => {
    e.preventDefault();
  };

  const handleItemClick = () => {
    const deleteObj: DeleteImageInput = {
      idx: calendarPageIdx,
      deleteImageKey: rightClickPosition.key,
    };
    dispatch(deleteImage(deleteObj));

    setRightClickPosition(() => ({}));
  };

  return (
    <div
      className="menu-box bg-slate-100"
      style={{
        position: "absolute",
        left: `${rightClickPosition.clickX}px`,
        top: `${rightClickPosition.clickY}px`,
      }}
      onClick={handleMenuClick}
      onContextMenu={handleMenuRightClick}
    >
      <div onClick={handleItemClick}>이미지 삭제</div>
    </div>
  );
}
