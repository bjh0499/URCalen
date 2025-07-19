import React from "react";
import { useAppDispatch } from "../../../store/hooks";

import { Resizable } from "react-resizable";
import Draggable from "react-draggable";

import { updateWidget } from "../../../store/slices/calendarPagesSlice";

import type UpdateWidgetInput from "../../../class/UpdateWidgetInput";

export default function ImageComponent({
  imageId,
  calendarPageIdx,
  calendarPage,
  setRightClickPosition,
}) {
  const dispatch = useAppDispatch();

  const imageData = calendarPage.widgetList[imageId]!.data;
  const imagePosition = calendarPage.widgetList[imageId]!.position;
  const imageSize = calendarPage.widgetList[imageId]!.size;

  const handleOnResize = (e, { node, size, handle }) => {
    const sizeObj = {
      width: size.width,
      height: size.height,
    };

    const updateImageObj: UpdateWidgetInput = {
      idx: calendarPageIdx,
      updateWidgetKey: imageId,
      type: "size",
      newValue: sizeObj,
    };

    dispatch(updateWidget(updateImageObj));
  };

  const handleOnResizeStop = (e, { node, size, handle }) => {
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

  const handleRightClick = (e) => {
    e.preventDefault();

    const clickObj = {
      key: imageId,
      type: "image",
      clickX: e.clientX,
      clickY: e.clientY,
    };

    let element = e.target;

    do {
      const styleTransform = element.style.transform;

      const parts1 = /^translate\((-?\d{1,})px\)$/.exec(styleTransform);
      if (parts1) {
        clickObj.clickX = parseInt(parts1[1], 10);
        clickObj.clickY = 0;
        setRightClickPosition(() => clickObj);
        return;
      } else {
        const parts2 = /^translate\((-?\d{1,})px, (-?\d{1,})px\)$/.exec(
          styleTransform
        );

        if (parts2) {
          clickObj.clickX = parseInt(parts2[1], 10);
          clickObj.clickY = parseInt(parts2[2], 10);
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
          className="w-full h-full"
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
