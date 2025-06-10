import type WidgetOption from "./WidgetOption";
import type WidgetPosition from "./WidgetPosition";
import type WidgetSize from "./WidgetSize";

type UpdateImageInput = {
  idx: number;
  updateImageKey: number;
  type: "option" | "position" | "size";
  newValue: WidgetOption | WidgetPosition | WidgetSize;
};

export default UpdateImageInput;
