import type WidgetOption from "./WidgetOption";
import type WidgetPosition from "./WidgetPosition";
import type WidgetSize from "./WidgetSize";

type UpdateWidgetInput = {
  idx: number;
  updateWidgetKey: number;
  type: "option" | "position" | "size";
  newValue: WidgetOption | WidgetPosition | WidgetSize;
};

export default UpdateWidgetInput;
