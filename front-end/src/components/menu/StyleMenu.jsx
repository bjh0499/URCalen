import { useDispatch, useSelector } from "react-redux";

import Modal from "../utils/Modal";

import { updateCalendar } from "../../store/slices/calendarPagesSlice";

export default function StyleMenu({ calendarKey }) {
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

  return (
    <Modal>
      <div onClick={handleItemClick}>언어 변경</div>
    </Modal>
  );
}
