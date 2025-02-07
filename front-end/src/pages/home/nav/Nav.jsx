import React from "react";

import NavDivButton from "./NavDivButton";

export default function Nav({
  setMonthSelector,
  calendarKeyList,
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

  // TODO: 선택에 따라 파일 직접 저장이 아닌 서버로 보내는 과정 구현 필요
  const saveCalendar = () => {
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

          setCalendarKeyList([]);
          setCalendarId(calendarArray.length + 1);
          setCalendarOption({});
          setCalendarPosition({});
          setCalendarSize({});

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

          setCalendarOption(() => addOption);
          setCalendarPosition(() => addPosition);
          setCalendarSize(() => addSize);
          setCalendarKeyList(() => newKeyList);
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

  const buttonPropsList = [];
  buttonPropsList.push({ text: "◀◀", clickFunc: prevYear });
  buttonPropsList.push({ text: "◀", clickFunc: prevMonth });
  buttonPropsList.push({ text: "▶", clickFunc: nextMonth });
  buttonPropsList.push({ text: "▶▶", clickFunc: nextYear });
  buttonPropsList.push({ text: "+", clickFunc: addCalendar });
  buttonPropsList.push({ text: "S", clickFunc: saveCalendar });
  buttonPropsList.push({ text: "L", clickFunc: restoreCalendar });

  return (
    <div className="flex items-center">
      {buttonPropsList.map((buttonProps, idx) => (
        <NavDivButton
          key={idx}
          text={buttonProps.text}
          clickFunc={buttonProps.clickFunc}
        />
      ))}
    </div>
  );
}
