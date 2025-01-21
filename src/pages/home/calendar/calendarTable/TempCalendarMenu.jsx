import React from "react";

// TODO: 기능 구현에 집중하기 위해 임시적으로 만든 메뉴로, 추후 제거 예정
export default function TempCalendarMenu({ calendarKey, setCalendarKeyList }) {
  const handleClick = () => {
    setCalendarKeyList((prev) => {
      const removeIndex = prev.indexOf(calendarKey);
      return [
        ...prev.slice(0, removeIndex),
        ...prev.slice(removeIndex + 1, prev.length),
      ];
    });
  };

  const handleClick2 = (e) => {
    const parts = /^translate\((-?\d{1,})px, (-?\d{1,})px\)$/.exec(
      e.target.parentElement.parentElement.style.transform
    );
    const x = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    console.log(x);
    console.log(y);
  };
  return (
    <div>
      <button onClick={handleClick}>-</button>
      <button onClick={handleClick2}>*</button>
    </div>
  );
}
