import Modal from "../utils/Modal";

export default function StyleMenu({
  calendarKey,
  calendarOption,
  setCalendarOption,
}) {
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
    <Modal>
      <div onClick={handleItemClick}>언어 변경</div>
    </Modal>
  );
}
