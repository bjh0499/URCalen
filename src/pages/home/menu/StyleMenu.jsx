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
    const prevOption = calendarOption;
    const prevThisOption = prevOption[calendarKey];
    if (prevThisOption === undefined) {
      prevThisOption = { lang: "KO" };
    } else if (prevThisOption.lang === "KO") {
      prevThisOption.lang = "EN";
    } else if (prevThisOption.lang === "EN") {
      prevThisOption.lang = "KO";
    }
    prevOption[calendarKey] = prevThisOption;
    setCalendarOption(() => prevOption);
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
