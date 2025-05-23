import NavDivButton from "./NavDivButton";

export default function Nav({
  setMonthSelector,
  setLoginMenu,
  setSignUpMenu,
  setSaveMenu,
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

  const addCalendar = () => {
    setCalendarId((prev) => prev + 1);

    const addOption = JSON.parse(JSON.stringify(calendarOption));
    addOption[calendarId] = {
      lang: "KO",
    };

    const addPosition = JSON.parse(JSON.stringify(calendarPosition));
    addPosition[calendarId] = {
      x: 0,
      y: 0,
    };

    const addSize = JSON.parse(JSON.stringify(calendarSize));
    addSize[calendarId] = {
      width: 320,
      height: 320,
    };

    setCalendarOption(() => addOption);
    setCalendarPosition(() => addPosition);
    setCalendarSize(() => addSize);

    setCalendarKeyList((prev) => [...prev, calendarId]);
  };

  const saveCalendar = () => {
    setSaveMenu(() => true);
  };

  const restoreCalendar = () => {
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

  const login = () => {
    setLoginMenu(() => true);
  };

  const signIn = () => {
    setSignUpMenu(() => true);
  };

  const tempFunc = () => {};

  const calendarPageButtonPropsList1 = [];
  for (let i = 0; i < 13; i++) {
    calendarPageButtonPropsList1.push({ text: i, clickFunc: tempFunc });
  }

  const calendarPageButtonPropsList2 = [];
  calendarPageButtonPropsList2.push({ text: "F", clickFunc: tempFunc });
  calendarPageButtonPropsList2.push({ text: "R", clickFunc: tempFunc });

  const calendarButtonPropsList = [];
  calendarButtonPropsList.push({ text: "◀◀", clickFunc: prevYear });
  calendarButtonPropsList.push({ text: "◀", clickFunc: prevMonth });
  calendarButtonPropsList.push({ text: "▶", clickFunc: nextMonth });
  calendarButtonPropsList.push({ text: "▶▶", clickFunc: nextYear });
  calendarButtonPropsList.push({ text: "+", clickFunc: addCalendar });
  calendarButtonPropsList.push({ text: "S", clickFunc: saveCalendar });
  calendarButtonPropsList.push({ text: "L", clickFunc: restoreCalendar });

  const userButtonPropsList = [];
  userButtonPropsList.push({ text: "L", clickFunc: login });
  userButtonPropsList.push({ text: "S", clickFunc: signIn });

  return (
    <div className="flex-col-center w-full">
      <div className="flex justify-between w-full">
        <div>
          <div className="flex items-center">
            {calendarPageButtonPropsList1.map((buttonProps, idx) => (
              <NavDivButton
                key={idx}
                text={buttonProps.text}
                clickFunc={buttonProps.clickFunc}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center">
            {calendarPageButtonPropsList2.map((buttonProps, idx) => (
              <NavDivButton
                key={idx}
                text={buttonProps.text}
                clickFunc={buttonProps.clickFunc}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          {calendarButtonPropsList.map((buttonProps, idx) => (
            <NavDivButton
              key={idx}
              text={buttonProps.text}
              clickFunc={buttonProps.clickFunc}
            />
          ))}
        </div>
        <div className="flex items-center">
          {userButtonPropsList.map((buttonProps, idx) => (
            <NavDivButton
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
