export default function arrangeCalendarPages(state) {
  const calendarData = {
    calendarTitle: state.calendarTitle,
    calendarPages: [],
  };
  const calendarPages = state.calendarPages;
  for (let i = 0; i < 28; i++) {
    const calendarPageObj = {
      calendarPageDataList: [],
      calendarPageImageList: [],
    };

    calendarPages[i].calendarKeyList.forEach((key) => {
      const calendarPageDataObj = {};
      calendarPageDataObj.calendarOption = calendarPages[i].calendarOption[key];
      calendarPageDataObj.calendarPosition =
        calendarPages[i].calendarPosition[key];
      calendarPageDataObj.calendarSize = calendarPages[i].calendarSize[key];
      calendarPageObj.calendarPageDataList.push(calendarPageDataObj);
    });

    calendarPages[i].imageKeyList.forEach((key) => {
      const calendarPageImageObj = {};
      calendarPageImageObj.imageData = calendarPages[i].imageData[key];
      calendarPageImageObj.imagePosition = calendarPages[i].imagePosition[key];
      calendarPageImageObj.imageSize = calendarPages[i].imageSize[key];
      calendarPageObj.calendarPageImageList.push(calendarPageImageObj);
    });

    calendarData.calendarPages.push(calendarPageObj);
  }

  return calendarData;
}
