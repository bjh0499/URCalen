import React from "react";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";

import Modal from "../utils/Modal";

import { saveCalendarPages } from "../../store/slices/calendarPagesSlice";

import type DefaultMenuInput from "../../class/DefaultMenuInput";

export default function SaveMenu({ setModalOption }: DefaultMenuInput) {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    isPublic: false,
  });

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(() => ({ isPublic: e.target.checked }));
  };

  const handleFileSave = () => {
    dispatch(saveCalendarPages("local"));
    setModalOption(() => ({}));
  };

  const handleServerSave = async () => {
    dispatch(saveCalendarPages("server"));
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
