import { useState } from "react";
import { useDispatch } from "react-redux";

import Modal from "../utils/Modal";

import { saveCalendarPages } from "../../store/slices/calendarPagesSlice";

export default function SaveMenu({ setModalOption }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    isPublic: false,
  });

  const handleFormInput = (e) => {
    setFormData(() => ({ isPublic: e.target.checked }));
  };

  const handleFileSave = () => {
    dispatch(saveCalendarPages({ type: "local" }));
    setModalOption(() => ({}));
  };

  const handleServerSave = async () => {
    dispatch(saveCalendarPages({ type: "server" }));
    setModalOption(() => ({}));
  };

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
