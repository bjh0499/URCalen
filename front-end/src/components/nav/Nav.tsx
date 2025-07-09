import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  addCalendar,
  addImage,
  loadCalendarPages,
  resetCalendarPages,
} from "../../store/slices/calendarPagesSlice";
import { plusYear, minusYear } from "../../store/slices/selectedMonthSlice";

import MonthChangeButton from "./MonthChangeButton";
import NormalNavDivButton from "./NormalNavDivButton";

import jsonToCalendarPages from "./utils/jsonToCalendarPages";

import type NormalNavDivButtonInput from "../../class/NormalNavDivButtonInput";
import type MonthChangeButtonInput from "../../class/MonthChangeButtonInput";

export default function Nav({ setModalOption }) {
  const dispatch = useAppDispatch();
  const selectedMonth = useAppSelector((state) => state.selectedMonth.month);
  const isFront = useAppSelector((state) => state.selectedMonth.front);
  const idx = (selectedMonth << 1) + (isFront ? 0 : 1);

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

  const handleCopyCalendar = (e) => {
    e.stopPropagation();
    setModalOption(() => ({ type: "copyCalendar" }));
  };

  const handleAddCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addCalendar(idx));
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const addImageProcess = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        dispatch(addImage({ idx: idx, img: reader.result as string }));
      });

      if (!file) {
        alert("이미지가 선택되지 않았습니다.");
      } else if (
        ["image/jpeg", "image/png", "image/webp"].includes(file.type)
      ) {
        reader.readAsDataURL(file);
      } else {
        alert("이미지 형식이 올바르지 않거나 손상된 파일입니다.");
      }
    };

    const file = document.createElement("input");
    file.type = "file";
    file.accept = ".png,.jpg,.jpeg,.webp";
    file.addEventListener("change", addImageProcess);
    file.click();
    file.remove();
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
    file.accept = ".json,data:text/json;charset=utf-8";
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

  const calendarPageButtonPropsList1: Array<MonthChangeButtonInput> = [];
  for (let i = 0; i < 14; i++) {
    calendarPageButtonPropsList1.push({
      text: i ? (i === 13 ? "끝" : i + "월") : "시작",
      type: "month",
      isActive: selectedMonth === i,
      value: i,
    });
  }

  const calendarPageButtonPropsList2: Array<MonthChangeButtonInput> = [];
  calendarPageButtonPropsList2.push({
    text: "앞",
    type: "front",
    isActive: isFront,
    value: true,
  });
  calendarPageButtonPropsList2.push({
    text: "뒤",
    type: "front",
    isActive: !isFront,
    value: false,
  });

  const calendarButtonPropsList: Array<NormalNavDivButtonInput> = [];
  calendarButtonPropsList.push({ text: "작년", clickFunc: prevYear });
  calendarButtonPropsList.push({ text: "내년", clickFunc: nextYear });
  calendarButtonPropsList.push({
    text: "달력 추가",
    clickFunc: handleAddCalendar,
  });
  calendarButtonPropsList.push({
    text: "이미지 추가",
    clickFunc: handleAddImage,
  });
  calendarButtonPropsList.push({
    text: "달력 옵션",
    clickFunc: handleGlobalOption,
  });
  calendarButtonPropsList.push({
    text: "달력 복사",
    clickFunc: handleCopyCalendar,
  });
  calendarButtonPropsList.push({
    text: "달력 저장",
    clickFunc: handleSaveCalendar,
  });
  calendarButtonPropsList.push({
    text: "달력 불러오기",
    clickFunc: handleRestoreCalendar,
  });

  const userButtonPropsList: Array<NormalNavDivButtonInput> = [];
  userButtonPropsList.push({ text: "로그인", clickFunc: login });
  userButtonPropsList.push({ text: "가입", clickFunc: signUp });

  return (
    <div className="flex-col-center w-full h-fit">
      <div className="flex justify-between w-full h-fit">
        <div>
          <div className="flex items-center">
            {calendarPageButtonPropsList1.map((buttonProps, idx) => (
              <MonthChangeButton
                key={idx}
                text={buttonProps.text}
                type={buttonProps.type}
                isActive={buttonProps.isActive}
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
                isActive={buttonProps.isActive}
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
