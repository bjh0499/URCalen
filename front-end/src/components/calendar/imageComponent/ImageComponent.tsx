import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { Resizable, ResizeCallbackData } from "react-resizable";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

import { updateWidget } from "../../../store/slices/calendarPagesSlice";

import type UpdateWidgetInput from "../../../class/UpdateWidgetInput";
import type CalendarPage from "../../../class/CalendarPage";
import type ClickPosition from "../../../class/ClickPosition";

type ImageComponentInput = {
  imageId: number;
  calendarPageIdx: number;
  calendarPage: CalendarPage;
  setRightClickPosition: React.Dispatch<React.SetStateAction<ClickPosition>>;
};

export default function ImageComponent({
  imageId,
  calendarPageIdx,
  calendarPage,
  setRightClickPosition,
}: ImageComponentInput) {
  const dispatch = useAppDispatch();

  const imageData = calendarPage.widgetList[imageId]!.data;
  const imagePosition = calendarPage.widgetList[imageId]!.position;
  const imageSize = calendarPage.widgetList[imageId]!.size;

  const handleOnResize = (
    e: React.SyntheticEvent,
    { size }: ResizeCallbackData
  ) => {
    const updateImageObj: UpdateWidgetInput = {
      idx: calendarPageIdx,
      updateWidgetKey: imageId,
      type: "size",
      newValue: size,
    };

    dispatch(updateWidget(updateImageObj));
  };

  const handleOnResizeStop = (
    e: React.SyntheticEvent,
    { size }: ResizeCallbackData
  ) => {
    const positionObj = {
      x: imagePosition.x,
      y: imagePosition.y,
      z: imagePosition.z,
    };

    if (positionObj.x + size.width > 1060) {
      positionObj.x = 1060 - size.width;
    }

    if (positionObj.y + size.height > 750) {
      positionObj.y = 750 - size.height;
    }

    const updateImageObj: UpdateWidgetInput = {
      idx: calendarPageIdx,
      updateWidgetKey: imageId,
      type: "position",
      newValue: positionObj,
    };

    setTimeout(() => {
      dispatch(updateWidget(updateImageObj));
    }, 10);
  };

  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const clickObj: ClickPosition = {
      key: imageId,
      type: "Image",
      clickX: e.clientX,
      clickY: e.clientY,
    };

    let element: HTMLElement | null = e.currentTarget;

    do {
      const styleTransform = element.style.transform;

      const parts1 = /^translate\((-?\d{1,})px\)$/.exec(styleTransform);
      if (parts1) {
        setRightClickPosition(() => clickObj);
        return;
      } else {
        const parts2 = /^translate\((-?\d{1,})px, (-?\d{1,})px\)$/.exec(
          styleTransform
        );

        if (parts2) {
          setRightClickPosition(() => clickObj);
          return;
        } else {
          element = element.parentElement;
        }
      }
    } while (element);
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    const positionObj = {
      x: data.x,
      y: data.y,
      z: imagePosition.z,
    };

    const updateImageObj: UpdateWidgetInput = {
      idx: calendarPageIdx,
      updateWidgetKey: imageId,
      type: "position",
      newValue: positionObj,
    };

    dispatch(updateWidget(updateImageObj));
  };

  const { selectedWidgetKey } = useAppSelector((state) => state.selectedWidget);
  const classNameStr = `w-full h-full border ${
    selectedWidgetKey === imageId ? "border-black" : "border-white"
  }`;

  return (
    <Draggable
      bounds="parent"
      cancel={".react-resizable-handle"}
      position={{ x: imagePosition.x, y: imagePosition.y }}
      onStop={handleDragStop}
    >
      <Resizable
        className="hover-handles"
        width={imageSize.width}
        height={imageSize.height}
        minConstraints={[320, 320]}
        maxConstraints={[1060, 750]}
        onResize={handleOnResize}
        onResizeStop={handleOnResizeStop}
      >
        <div
          className={classNameStr}
          style={{
            width: imageSize.width + "px",
            height: imageSize.height + "px",
            zIndex: imagePosition.z,
          }}
          onContextMenu={handleRightClick}
        >
          <img className="w-full h-full" src={imageData} draggable={false} />
        </div>
      </Resizable>
    </Draggable>
  );
}
