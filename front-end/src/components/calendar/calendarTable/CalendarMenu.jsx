export default function CalendarMenu({
  rightClickPosition,
  setCalendarKeyList,
  setRightClickPosition,
  setModalOption,
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
      const removeIndex = prev.indexOf(rightClickPosition.key);
      return [
        ...prev.slice(0, removeIndex),
        ...prev.slice(removeIndex + 1, prev.length),
      ];
    });

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
