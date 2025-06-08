import { useDispatch } from "react-redux";

import {
  setMonth,
  setValue,
  setIsChanged,
} from "../../store/slices/selectedMonthSlice";

export default function MonthChangeButton({ text, type, isActive, value }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsChanged(true));
    if (type === "month") {
      dispatch(setMonth(value));
    } else if (type === "front") {
      dispatch(setValue(value));
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
