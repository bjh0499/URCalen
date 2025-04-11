import { useState } from "react";

import customCalendarApi from "../../api/customCalendarApi";

import Modal from "../utils/Modal";

export default function SaveMenu({
  setModalOption,
  calendarKeyList,
  calendarOption,
  calendarPosition,
  calendarSize,
}) {
  const [formData, setFormData] = useState({
    isPublic: false,
  });

  const handleFormInput = (e) => {
    setFormData(() => ({ isPublic: e.target.checked }));
  };

  const handleFileSave = () => {
    const calendarDataList = [];
    calendarKeyList.forEach((key) => {
      const calendarDataObj = {};
      calendarDataObj.calendarOption = calendarOption[key];
      calendarDataObj.calendarPosition = calendarPosition[key];
      calendarDataObj.calendarSize = calendarSize[key];
      calendarDataList.push(calendarDataObj);
    });

    // https://codesandbox.io/p/sandbox/export-js-object-to-json-download-file-react-4t2xb?file=%2Fsrc%2FApp.js%3A69%2C5-69%2C18
    const link = document.createElement("a");
    link.href = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(calendarDataList)
    )}`;
    link.download = "data.json";
    link.click();
    link.remove();

    setModalOption(() => ({}));
  };

  const handleServerSave = async () => {
    const calendarDataList = [];
    calendarKeyList.forEach((key) => {
      const calendarDataObj = {};
      calendarDataObj.calendarOption = calendarOption[key];
      calendarDataObj.calendarPosition = calendarPosition[key];
      calendarDataObj.calendarSize = calendarSize[key];
      calendarDataList.push(calendarDataObj);
    });

    const customCalendar = {};

    // TODO: 달력 제목을 정하는 부분은 추후 추가
    customCalendar.title = "달력 제목";
    customCalendar.calendarData = JSON.stringify(calendarDataList);
    // TODO: 사진 업로드 부분은 추후 추가
    customCalendar.imageData = "";
    customCalendar.isPublic = formData.isPublic;

    try {
      const response = await customCalendarApi.createCustomCalendar(
        customCalendar
      );
      alert("달력이 저장되었습니다.");
    } catch (err) {
      alert("달력 저장 과정에서 오류가 발생했습니다.");
      alert(err);
    }

    setModalOption(() => ({}));
  };

  // https://stackoverflow.com/questions/6334495/
  return (
    <Modal>
      <div onClick={handleFileSave}>파일로 저장</div>
      <div onClick={handleServerSave}>서버에 저장</div>
      <form>
        <div>
          <label htmlFor="isPublic">공개 여부: </label>
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleFormInput}
          />
        </div>
      </form>
    </Modal>
  );
}
