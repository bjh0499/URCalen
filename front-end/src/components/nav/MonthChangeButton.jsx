import { useDispatch } from "react-redux";

import { setMonth } from "../../store/slices/selectedMonthSlice";
import { setIsChanged } from "../../store/slices/selectedMonthSlice";

export default function MonthChangeButton({ text, type, isActive, value }) {
  const dispatch = useDispatch();

  console.log(isActive);

  const handleClick = () => {
    dispatch(setIsChanged({ isChanged: true }));
    dispatch(setMonth({ type: type, value: value }));
    setTimeout(() => {
      dispatch(setIsChanged({ isChanged: false }));
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
