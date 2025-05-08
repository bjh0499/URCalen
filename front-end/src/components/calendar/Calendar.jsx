import { useDispatch, useSelector } from "react-redux";

import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

import CalendarHeader from "./calendarHeader/CalendarHeader";
import CalendarTable from "./calendarTable/CalendarTable";

import { updateCalendar } from "../../store/slices/calendarPagesSlice";

export default function Calendar({
  calendarKey,
  holidays,
  setRightClickPosition,
}) {
  const dispatch = useDispatch();

  const selectedMonth = useSelector((state) => state.selectedMonth.month);
  const isFront = useSelector((state) => state.selectedMonth.front);
  const calendarPageIdx = (selectedMonth << 1) + !isFront;
  const calendarPage = useSelector(
    (state) => state.calendarPages.calendarPages[calendarPageIdx]
  );
  const sizeState = calendarPage.calendarSize[calendarKey];
  const positionState = calendarPage.calendarPosition[calendarKey];

  const handleOnResize = (e, { node, size, handle }) => {
    const sizeObj = {
      width: size.width,
      height: size.height,
    };

    const updateCalendarObj = {
      idx: calendarPageIdx,
      calendarKey: calendarKey,
      type: "calendarSize",
      obj: sizeObj,
    };

    dispatch(updateCalendar(updateCalendarObj));
  };

  const handleOnResizeStop = (e, { node, size, handle }) => {
    const positionObj = {
      x: positionState.x,
      y: positionState.y,
    };

    if (positionObj.x + size.width > 1060) {
      positionObj.x = 1060 - size.width;
    }

    if (positionObj.y + size.height > 750) {
      positionObj.y = 750 - size.height;
    }

    const updateCalendarObj = {
      idx: calendarPageIdx,
      calendarKey: calendarKey,
      type: "calendarPosition",
      obj: positionObj,
    };

    setTimeout(() => {
      dispatch(updateCalendar(updateCalendarObj));
    }, 10);
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    const clickObj = {
      key: calendarKey,
      clickX: e.clientX,
      clickY: e.clientY,
    };

    let element = e.target;

    do {
      const styleTransform = element.style.transform;

      const parts1 = /^translate\((-?\d{1,})px\)$/.exec(styleTransform);
      if (parts1) {
        clickObj.calendarX = parseInt(parts1[1], 10);
        clickObj.calendarY = 0;
        setRightClickPosition(() => clickObj);
        return;
      } else {
        const parts2 = /^translate\((-?\d{1,})px, (-?\d{1,})px\)$/.exec(
          styleTransform
        );

        if (parts2) {
          clickObj.calendarX = parseInt(parts2[1], 10);
          clickObj.calendarY = parseInt(parts2[2], 10);
          setRightClickPosition(() => clickObj);
          return;
        } else {
          element = element.parentElement;
        }
      }
    } while (element);
  };

  const handleDragStop = (e, data) => {
    const positionObj = {
      x: data.x,
      y: data.y,
    };

    const updateCalendarObj = {
      idx: calendarPageIdx,
      calendarKey: calendarKey,
      type: "calendarPosition",
      obj: positionObj,
    };

    dispatch(updateCalendar(updateCalendarObj));
  };

  return (
    <Draggable
      bounds="parent"
      cancel={".react-resizable-handle"}
      position={{ x: positionState.x, y: positionState.y }}
      onStop={handleDragStop}
    >
      <Resizable
        className="hover-handles"
        width={sizeState.width}
        height={sizeState.height}
        minConstraints={[320, 320]}
        maxConstraints={[1060, 750]}
        onResize={handleOnResize}
        onResizeStop={handleOnResizeStop}
      >
        <div
          className="w-full h-full"
          style={{
            width: sizeState.width + "px",
            height: sizeState.height + "px",
          }}
          onContextMenu={handleRightClick}
        >
          <CalendarHeader />
          <CalendarTable
            calendarKey={calendarKey}
            holidays={holidays}
            sizeState={sizeState}
          />
        </div>
      </Resizable>
    </Draggable>
  );
}
