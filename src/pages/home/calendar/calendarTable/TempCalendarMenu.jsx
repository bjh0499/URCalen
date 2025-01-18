import React from "react";

// TODO: 기능 구현에 집중하기 위해 임시적으로 만든 메뉴로, 추후 제거 예정
export default function TempCalendarMenu({
  calendarKey,
  calendarKeyList,
  setCalendarKeyList,
}) {
  const handleClick = () => {
    console.log(calendarKey);
    console.log(calendarKeyList);
    setCalendarKeyList((prev) => {
      const removeIndex = prev.indexOf(calendarKey);
      return [
        ...prev.slice(0, removeIndex),
        ...prev.slice(removeIndex + 1, prev.length),
      ];
    });
  };
  return (
    <div>
      <button onClick={handleClick}>-</button>
    </div>
  );
}
