import { useDispatch, useSelector } from "react-redux";

import Modal from "../utils/Modal";

import { updateCalendar } from "../../store/slices/calendarPagesSlice";

export default function StyleMenu({
  calendarKey,
  calendarOption,
  setCalendarOption,
}) {
  const dispatch = useDispatch();

  const selectedMonth = useSelector((state) => state.selectedMonth.month);
  const isFront = useSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + !isFront;
  const calendarPage = useSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );

  const handleItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // 과거 브라우저 호환을 위해, Object.assign, structuredClone method 대신 JSON을 통한 복사 구현

    const calendarThisOption = calendarPage.calendarOption[calendarKey];
    let langValue;

    if (calendarThisOption.lang === undefined) {
      langValue = "EN";
    } else {
      langValue = calendarThisOption.lang === "KO" ? "EN" : "KO";
    }

    const optionObj = {
      lang: langValue,
    };

    const updateCalendarObj = {
      idx: calendarPageIdx,
      calendarKey: calendarKey,
      type: "calendarOption",
      obj: optionObj,
    };

    dispatch(updateCalendar(updateCalendarObj));
  };

  // https://stackoverflow.com/questions/6334495/
  return (
    <Modal>
      <div onClick={handleItemClick}>언어 변경</div>
    </Modal>
  );
}
