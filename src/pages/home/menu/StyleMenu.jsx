import React from "react";

export default function StyleMenu({
  calendarKey,
  calendarOption,
  setCalendarOption,
}) {
  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const changeOption = calendarOption;
    let changeThisOption = changeOption[calendarKey];
    console.log(changeThisOption);
    if (changeThisOption === undefined) {
      changeThisOption = { lang: "KO" };
    } else {
      changeThisOption.lang = changeThisOption.lang === "KO" ? "EN" : "KO";
    }
    console.log(changeOption);
    changeOption[calendarKey] = changeThisOption;
    console.log(changeOption);
    setCalendarOption(() => changeOption);
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
      <div onClick={handleItemClick}>언어 변경</div>
    </div>
  );
}
