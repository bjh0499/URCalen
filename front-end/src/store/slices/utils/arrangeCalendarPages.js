export default function arrangeCalendarPages(calendarPages) {
  const calendarPagesDataList = [];
  for (let i = 0; i < 28; i++) {
    const calendarPageDataList = [];
    calendarPages[i].calendarKeyList.forEach((key) => {
      const calendarPageDataObj = {};
      calendarPageDataObj.calendarOption = calendarPages[i].calendarOption[key];
      calendarPageDataObj.calendarPosition =
        calendarPages[i].calendarPosition[key];
      calendarPageDataObj.calendarSize = calendarPages[i].calendarSize[key];
      calendarPageDataList.push(calendarPageDataObj);
    });

    calendarPagesDataList.push(calendarPageDataList);
  }

  return calendarPagesDataList;
}
