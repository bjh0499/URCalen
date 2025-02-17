import React from "react";

export default function SaveMenu({
  setSaveMenu,
  calendarKeyList,
  calendarOption,
  calendarPosition,
  calendarSize,
}) {
  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileSave = () => {
    const saveCalendarData = [];
    calendarKeyList.forEach((key) => {
      const calendarDataObj = {};
      calendarDataObj.calendarOption = calendarOption[key];
      calendarDataObj.calendarPosition = calendarPosition[key];
      calendarDataObj.calendarSize = calendarSize[key];
      saveCalendarData.push(calendarDataObj);
    });

    // https://codesandbox.io/p/sandbox/export-js-object-to-json-download-file-react-4t2xb?file=%2Fsrc%2FApp.js%3A69%2C5-69%2C18
    const link = document.createElement("a");
    link.href = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(saveCalendarData)
    )}`;
    link.download = "data.json";
    link.click();
    link.remove();

    setSaveMenu(() => false);
  };

  const handleServerSave = () => {
    setSaveMenu(() => false);
  };

  // https://stackoverflow.com/questions/6334495/
  return (
    <div
      className="style-menu-box bg-slate-100 z-100"
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        zIndex: "100",
        height: "400px",
        marginTop: "-200px",
        width: "600px",
        marginLeft: "-300px",
      }}
      onClick={handleMenuClick}
    >
      <div onClick={handleFileSave}>파일로 저장</div>
      <div onClick={handleServerSave}>서버에 저장</div>
    </div>
  );
}
