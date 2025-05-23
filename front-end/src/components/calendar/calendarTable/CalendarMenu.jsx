export default function CalendarMenu({
  clickX,
  clickY,
  calendarKey,
  setCalendarKeyList,
  setRightClickPosition,
  setStyleMenu,
}) {
  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMenuRightClick = (e) => {
    e.preventDefault();
  };

  const handleItemClick = () => {
    setCalendarKeyList((prev) => {
      const removeIndex = prev.indexOf(calendarKey);
      return [
        ...prev.slice(0, removeIndex),
        ...prev.slice(removeIndex + 1, prev.length),
      ];
    });

    setRightClickPosition(() => ({}));
  };

  const handleItemClick2 = () => {
    setStyleMenu(() => ({ calendarKey: calendarKey }));
    setRightClickPosition(() => ({}));
  };

  return (
    <div
      className="menu-box bg-slate-100"
      style={{ position: "absolute", left: `${clickX}px`, top: `${clickY}px` }}
      onClick={handleMenuClick}
      onContextMenu={handleMenuRightClick}
    >
      <div onClick={handleItemClick}>달력 삭제</div>
      <div onClick={handleItemClick2}>달력 스타일</div>
    </div>
  );
}
