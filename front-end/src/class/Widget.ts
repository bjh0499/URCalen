import type WidgetOption from "./WidgetOption";
import type WidgetPosition from "./WidgetPosition";
import type WidgetSize from "./WidgetSize";

type Widget = {
  widgetType: "Calendar" | "Image";
  data: string | null;
  option: WidgetOption;
  position: WidgetPosition;
  size: WidgetSize;
};

export default Widget;
