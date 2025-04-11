import { useDispatch, useSelector } from "react-redux";

import { addCalendar } from "../../store/slices/calendarPagesSlice";

import FrontChangeButton from "./FrontChangeButton";
import MonthChangeButton from "./MonthChangeButton";
import NormalNavDivButton from "./NormalNavDivButton";

export default function Nav({
  setMonthSelector,
  setModalOption,
  setCalendarKeyList,
  calendarId,
  setCalendarId,
  calendarOption,
  setCalendarOption,
  calendarPosition,
  setCalendarPosition,
  calendarSize,
  setCalendarSize,
}) {
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.selectedMonth.month);
  const isFront = useSelector((state) => state.selectedMonth.front);

  const prevYear = () => {
    setMonthSelector((prev) => {
      return {
        year: prev.year - 1,
        month: prev.month,
      };
    });
  };
  const prevMonth = () => {
    setMonthSelector((prev) => {
      return {
        year: prev.year - (prev.month === 0),
        month: (prev.month + 11) % 12,
      };
    });
  };
  const nextMonth = () => {
    setMonthSelector((prev) => {
      return {
        year: prev.year + (prev.month === 11),
        month: (prev.month + 1) % 12,
      };
    });
  };
  const nextYear = () => {
    setMonthSelector((prev) => {
      return {
        year: prev.year + 1,
        month: prev.month,
      };
    });
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
    const restoreProcess = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        try {
          const calendarArray = JSON.parse(reader.result);
          if (
            Object.prototype.toString.call(calendarArray) !== "[object Array]"
          ) {
            alert("파일 형식이 올바르지 않거나 손상된 파일입니다.");
            return;
          }

          let invalid = false;

          for (let i = 0; i < calendarArray.length; i++) {
            const c = calendarArray[i];
            if (!c.calendarOption || !c.calendarPosition || !c.calendarSize) {
              invalid = true;
              break;
            }

            // TODO: ENUM 등 형식을 고려해서 외부에서 불러오는 방식을 고려 중
            let cp = c.calendarOption;
            if (!cp.lang || !["KO", "EN"].includes(cp.lang)) {
              invalid = true;
              break;
            }

            cp = c.calendarPosition;
            if (!cp.x || !cp.y) {
              invalid = true;
              break;
            }

            cp = c.calendarSize;
            if (!cp.width || !cp.height || cp.width < 320 || cp.height < 320) {
              invalid = true;
              break;
            }
          }

          if (invalid) {
            alert("파일 형식이 올바르지 않거나 손상된 파일입니다.");
            return;
          }

          const addOption = {};
          const addPosition = {};
          const addSize = {};
          const newKeyList = [];

          for (let i = 1; i <= calendarArray.length; i++) {
            addOption[i] = JSON.parse(
              JSON.stringify(calendarArray[i - 1].calendarOption)
            );

            addPosition[i] = JSON.parse(
              JSON.stringify(calendarArray[i - 1].calendarPosition)
            );

            addSize[i] = JSON.parse(
              JSON.stringify(calendarArray[i - 1].calendarSize)
            );

            newKeyList.push(i);
          }

          setCalendarKeyList([]);
          setCalendarId(calendarArray.length + 1);
          setCalendarOption({});
          setCalendarPosition({});
          setCalendarSize({});

          setTimeout(() => {
            setCalendarOption(() => addOption);
            setCalendarPosition(() => addPosition);
            setCalendarSize(() => addSize);
            setCalendarKeyList(() => newKeyList);
          }, 50);
        } catch (e) {
          alert("파일 형식이 올바르지 않거나 손상된 파일입니다.");
        }
      });

      if (!file) {
        alert("파일이 선택되지 않았습니다.");
        return;
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
    calendarPageButtonPropsList1.push({ text: i, value: i });
  }

  const calendarPageButtonPropsList2 = [];
  calendarPageButtonPropsList2.push({ text: "F", value: true });
  calendarPageButtonPropsList2.push({ text: "R", value: false });

  const calendarButtonPropsList = [];
  calendarButtonPropsList.push({ text: "◀◀", clickFunc: prevYear });
  calendarButtonPropsList.push({ text: "◀", clickFunc: prevMonth });
  calendarButtonPropsList.push({ text: "▶", clickFunc: nextMonth });
  calendarButtonPropsList.push({ text: "▶▶", clickFunc: nextYear });
  calendarButtonPropsList.push({ text: "+", clickFunc: handleAddCalendar });
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
                value={buttonProps.value}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center">
            {calendarPageButtonPropsList2.map((buttonProps, idx) => (
              <FrontChangeButton
                key={idx}
                text={buttonProps.text}
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
