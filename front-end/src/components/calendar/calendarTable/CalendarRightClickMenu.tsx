import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { deleteCalendar } from "../../../store/slices/calendarPagesSlice";

export default function CalendarRightClickMenu({
  rightClickPosition,
  setRightClickPosition,
  setModalOption,
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
    </div>
  );
}
