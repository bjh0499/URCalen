import React from "react";
import { useAppDispatch } from "../../store/hooks";

import {
  setMonth,
  setFront,
  setIsChanged,
} from "../../store/slices/selectedMonthSlice";

import type MonthChangeButtonInput from "../../class/MonthChangeButtonInput";

export default function MonthChangeButton({
  text,
  type,
  isActive,
  value,
}: MonthChangeButtonInput) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsChanged(true));
    if (type === "month") {
      dispatch(setMonth(value as number));
    } else if (type === "front") {
      dispatch(setFront(value as boolean));
    }
    setTimeout(() => {
      dispatch(setIsChanged(false));
    }, 20);
  };

  return (
    <div
      className={`flex-center h-8 w-fit p-1 m-1 rounded text-2xl cursor-pointer ${
        isActive ? "bg-slate-600" : "bg-slate-300"
      }`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
}
