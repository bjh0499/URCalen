import React from "react";

export default function CalendarMenu({
  x,
  y,
  calendarKey,
  setCalendarKeyList,
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
  };

  // BUG: 현재 달력 위치를 구할 수 없는 문제 발생
  const handleItemClick2 = (e) => {
    console.log(e);
    const parts = /^translate\((-?\d{1,})px, (-?\d{1,})px\)$/.exec(
      e.target.parentElement.parentElement.style.transform
    );
    const x = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    console.log(x);
    console.log(y);
  };

  // TODO: 개발용 기능에 주의하고, 배포 시 이를 분리할 수단 요구
  return (
    <div
      className="menu-box bg-slate-100"
      style={{ position: "absolute", left: `${x}px`, top: `${y}px` }}
      onClick={handleMenuClick}
      onContextMenu={handleMenuRightClick}
    >
      <div onClick={handleItemClick}>달력 삭제</div>
      <div onClick={handleItemClick2}>달력 위치 정보</div>
    </div>
  );
}
