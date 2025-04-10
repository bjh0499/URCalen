export default function arrangeCalendarPages(calendarPages) {
  const calendarPagesDataList = [];
  for (let i = 0; i < 28; i++) {
    const calendarPageDataList = [];
    calendarPages[i].calendarKeyList.forEach((key) => {
      const calendarPageDataObj = {};
      calendarPageDataObj.calendarOption = calendarOption[key];
      calendarPageDataObj.calendarPosition = calendarPosition[key];
      calendarPageDataObj.calendarSize = calendarSize[key];
      calendarPageDataList.push(calendarPageDataObj);
    });

    calendarPagesDataList.push(calendarPageDataList);
  }

  return calendarPagesDataList;
}
