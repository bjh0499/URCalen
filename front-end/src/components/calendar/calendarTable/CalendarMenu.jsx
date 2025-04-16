import { useDispatch, useSelector } from "react-redux";

import { deleteCalendar } from "../../../store/slices/calendarPagesSlice";

export default function CalendarMenu({
  rightClickPosition,
  setCalendarKeyList,
  setRightClickPosition,
  setModalOption,
}) {
  const dispatch = useDispatch();

  const selectedMonth = useSelector((state) => state.selectedMonth.month);
  const isFront = useSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + !isFront;

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
      calendarKey: rightClickPosition.key,
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
      }}
      onClick={handleMenuClick}
      onContextMenu={handleMenuRightClick}
    >
      <div onClick={handleItemClick}>달력 삭제</div>
      <div onClick={handleItemClick2}>달력 스타일</div>
    </div>
  );
}
