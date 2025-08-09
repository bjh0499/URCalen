import React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import Modal from "../utils/Modal";

import { setCalendarTitle } from "../../store/slices/calendarPagesSlice";

import type DefaultMenuInput from "../../class/DefaultMenuInput";

export default function GlobalOptionMenu({ setModalOption }: DefaultMenuInput) {
  const [formData, setFormData] = useState({
    calendarTitle: useAppSelector((state) => state.calendarPages.calendarTitle),
  });

  const dispatch = useAppDispatch();

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setCalendarTitle(formData.calendarTitle));
    setModalOption(() => ({}));
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="calendarTitle">달력 이름: </label>
          <input
            id="calendarTitle"
            name="calendarTitle"
            required
            placeholder="달력 이름"
            value={formData.calendarTitle}
            onChange={handleFormInput}
          />
        </div>
        <button type="submit">확인</button>
      </form>
    </Modal>
  );
}
