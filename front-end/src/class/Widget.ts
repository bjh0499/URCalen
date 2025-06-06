// TODO: option의 경우, Option에 대한 interface를 만들고, 이를 각 widget(달력, 이미지, 텍스트)에 따라 구현한 class들을 지정

import type WidgetOption from "./WidgetOption";

type Widget = {
  widgetType: string;
  data: string | null;
  option: WidgetOption;
  position: object;
  size: object;
};

export default Widget;
