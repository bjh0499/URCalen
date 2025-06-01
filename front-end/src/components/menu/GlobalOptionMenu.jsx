import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../utils/Modal";

import { setCalendarTitle } from "../../store/slices/calendarPagesSlice";

export default function GlobalOptionMenu({ setModalOption }) {
  const [formData, setFormData] = useState({
    calendarTitle: useSelector((state) => state.calendarPages.calendarTitle),
  });

  const dispatch = useDispatch();

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setCalendarTitle({ calendarTitle: formData.calendarTitle }));
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
