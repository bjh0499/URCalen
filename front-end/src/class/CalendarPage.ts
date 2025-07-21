import type Widget from "./Widget";

type CalendarPage = {
  lastWidgetId?: number;
  widgetKeyList: Array<number>;
  widgetList: Array<Widget | null>;
};

export default CalendarPage;
