import { useDispatch, useSelector } from "react-redux";

import { deleteImage } from "../../../store/slices/calendarPagesSlice";

export default function ImageRightClickMenu({
  rightClickPosition,
  setRightClickPosition,
}) {
  const dispatch = useDispatch();

  const selectedMonth = useSelector((state) => state.selectedMonth.month);
  const isFront = useSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + !isFront;

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMenuRightClick = (e) => {
    e.preventDefault();
  };

  const handleItemClick = () => {
    const deleteObj = {
      idx: calendarPageIdx,
      imageId: rightClickPosition.key,
    };
    dispatch(deleteImage(deleteObj));

    setRightClickPosition(() => ({}));
  };

  return (
    <div
      className="menu-box bg-slate-100"
      style={{
        position: "absolute",
        left: `${rightClickPosition.clickX}px`,
        top: `${rightClickPosition.clickY}px`,
      }}
      onClick={handleMenuClick}
      onContextMenu={handleMenuRightClick}
    >
      <div onClick={handleItemClick}>이미지 삭제</div>
    </div>
  );
}
