import { useDispatch } from "react-redux";

import { setMonth } from "../../store/slices/selectedMonthSlice";

export default function MonthChangeButton({ text, value }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setMonth({ month: value }));
  };

  return (
    <div
      className="flex-center size-8 p-1 m-1 bg-slate-300 rounded text-2xl cursor-pointer"
      onClick={handleClick}
    >
      {text}
    </div>
  );
}
