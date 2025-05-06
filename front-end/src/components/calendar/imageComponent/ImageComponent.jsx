import { useDispatch, useSelector } from "react-redux";

import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

export default function ImageComponent({ imageId, setRightClickPosition }) {
  const dispatch = useDispatch();

  const selectedMonth = useSelector((state) => state.selectedMonth.month);
  const isFront = useSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + !isFront;
  const calendarPage = useSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );

  const imageData = calendarPage.imageData[imageId];
  const imagePosition = calendarPage.imagePosition[imageId];
  const imageSize = calendarPage.imageSize[imageId];

  return <div>ImageComponent</div>;
}
