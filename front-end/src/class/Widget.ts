// TODO: option의 경우, Option에 대한 interface를 만들고, 이를 각 widget(달력, 이미지, 텍스트)에 따라 구현한 class들을 지정

import type WidgetOption from "./WidgetOption";
import type WidgetPosition from "./WidgetPosition";
import type WidgetSize from "./WidgetSize";

type Widget = {
  widgetType: string;
  data: string | null;
  option: WidgetOption;
  position: WidgetPosition;
  size: WidgetSize;
};

export default Widget;
