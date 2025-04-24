import { useDispatch, useSelector } from "react-redux";

import {
  addCalendar,
  loadCalendarPages,
  resetCalendarPages,
} from "../../store/slices/calendarPagesSlice";
import { plusYear, minusYear } from "../../store/slices/selectedMonthSlice";

import MonthChangeButton from "./MonthChangeButton";
import NormalNavDivButton from "./NormalNavDivButton";

import jsonToCalendarPages from "./utils/jsonToCalendarPages";

export default function Nav({ setModalOption }) {
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.selectedMonth.month);
  const isFront = useSelector((state) => state.selectedMonth.front);

  const prevYear = () => {
    dispatch(minusYear());
  };

  const nextYear = () => {
    dispatch(plusYear());
  };

  const handleGlobalOption = (e) => {
    e.stopPropagation();
    setModalOption(() => ({ type: "globalOption" }));
  };

  const handleAddCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const inputObj = {
      idx: (selectedMonth << 1) + !isFront,
    };

    dispatch(addCalendar(inputObj));
  };

  const handleSaveCalendar = (e) => {
    e.stopPropagation();
    setModalOption(() => ({ type: "save" }));
  };

  const handleRestoreCalendar = () => {
    // 해당 과정을 state에서 진행 시, illegal operation attempted on a revoked proxy 라는 오류가 발생하므로 이곳에서 실행
    const restoreProcess = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const loadCalendarData = jsonToCalendarPages(reader.result);
        if (loadCalendarData !== null) {
          dispatch(resetCalendarPages());
          setTimeout(() => {
            dispatch(
              loadCalendarPages({ type: "local", data: loadCalendarData })
            );
          }, 10);
        }
      });

      if (!file) {
        alert("파일이 선택되지 않았습니다.");
      } else if (file.type === "application/json") {
        reader.readAsText(file);
      } else {
        alert("파일 형식이 올바르지 않거나 손상된 파일입니다.");
      }

      // TODO: alert으로 뜨는 오류 메시지를 별도 오류 창으로 표현할 예정
    };

    const file = document.createElement("input");
    file.type = "file";
    file.accept = ".json,data:text/json;chatset=utf-8";
    file.addEventListener("change", restoreProcess);
    file.click();
    file.remove();
  };

  const login = (e) => {
    e.stopPropagation();
    setModalOption(() => ({ type: "login" }));
  };

  const signUp = (e) => {
    e.stopPropagation();
    setModalOption(() => ({ type: "signup" }));
  };

  const calendarPageButtonPropsList1 = [];
  for (let i = 0; i < 13; i++) {
    calendarPageButtonPropsList1.push({ text: i, type: "month", value: i });
  }

  const calendarPageButtonPropsList2 = [];
  calendarPageButtonPropsList2.push({ text: "F", type: "front", value: true });
  calendarPageButtonPropsList2.push({ text: "R", type: "front", value: false });

  const calendarButtonPropsList = [];
  calendarButtonPropsList.push({ text: "◀", clickFunc: prevYear });
  calendarButtonPropsList.push({ text: "▶", clickFunc: nextYear });
  calendarButtonPropsList.push({ text: "+", clickFunc: handleAddCalendar });
  calendarButtonPropsList.push({ text: "O", clickFunc: handleGlobalOption });
  calendarButtonPropsList.push({ text: "S", clickFunc: handleSaveCalendar });
  calendarButtonPropsList.push({ text: "L", clickFunc: handleRestoreCalendar });

  const userButtonPropsList = [];
  userButtonPropsList.push({ text: "L", clickFunc: login });
  userButtonPropsList.push({ text: "S", clickFunc: signUp });

  return (
    <div className="flex-col-center w-full">
      <div className="flex justify-between w-full">
        <div>
          <div className="flex items-center">
            {calendarPageButtonPropsList1.map((buttonProps, idx) => (
              <MonthChangeButton
                key={idx}
                text={buttonProps.text}
                type={buttonProps.type}
                value={buttonProps.value}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center">
            {calendarPageButtonPropsList2.map((buttonProps, idx) => (
              <MonthChangeButton
                key={idx}
                text={buttonProps.text}
                type={buttonProps.type}
                value={buttonProps.value}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          {calendarButtonPropsList.map((buttonProps, idx) => (
            <NormalNavDivButton
              key={idx}
              text={buttonProps.text}
              clickFunc={buttonProps.clickFunc}
            />
          ))}
        </div>
        <div className="flex items-center">
          {userButtonPropsList.map((buttonProps, idx) => (
            <NormalNavDivButton
              key={idx}
              text={buttonProps.text}
              clickFunc={buttonProps.clickFunc}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
