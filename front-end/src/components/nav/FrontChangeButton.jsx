import { useDispatch } from "react-redux";

import { setFront } from "../../store/slices/selectedMonthSlice";
import { setIsChanged } from "../../store/slices/selectedMonthSlice";

export default function FrontChangeButton({ text, value }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsChanged({ isChanged: true }));
    dispatch(setFront({ front: value }));
    setTimeout(() => {
      dispatch(setIsChanged({ isChanged: false }));
    }, 20);
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
