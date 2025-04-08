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
    // 과거 브라우저 호환을 위해, Object.assign, structuredClone method 대신 JSON을 통한 복사 구현
    const changeOption = JSON.parse(JSON.stringify(calendarOption));
    let changeThisOption = changeOption[calendarKey];
    if (changeThisOption === undefined) {
      changeThisOption = { lang: "EN" };
    } else {
      changeThisOption.lang = changeThisOption.lang === "KO" ? "EN" : "KO";
    }
    changeOption[calendarKey] = changeThisOption;
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
