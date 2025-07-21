import React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import Modal from "../utils/Modal";

import { copyCalendarPage } from "../../store/slices/calendarPagesSlice";

export default function CopyCalendarMenu({ setModalOption }) {
  const dispatch = useAppDispatch();

  const [dstMonth, setDstMonth] = useState(0);
  const [dstFront, setDstFront] = useState(true);

  const srcMonth = useAppSelector((state) => state.selectedMonth.month);
  const srcFront = useAppSelector((state) => state.selectedMonth.front);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = {
      dstMonth: dstMonth,
      dstFront: dstFront,
      srcMonth: srcMonth,
      srcFront: srcFront,
    };
    dispatch(copyCalendarPage(inputData));
    setModalOption(() => ({}));
  };

  const handleChangeMonth = (e) => {
    setDstMonth(() => e.target.value);
  };

  const handleChangeFront = (e) => {
    setDstFront(() => e.target.value === "true");
  };

  const optionList: Array<React.JSX.Element> = [];
  for (let i = 0; i < 13; i++) {
    optionList.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputMonth">덮어쓸 페이지: </label>
          <select
            name="inputMonth"
            value={dstMonth}
            onChange={handleChangeMonth}
          >
            {optionList}
          </select>
        </div>
        <div>
          <label>덮어쓸 면: </label>
          <label>
            <input
              type="radio"
              name="inputFront"
              value="true"
              checked={dstFront === true}
              onChange={handleChangeFront}
            />
            앞
          </label>
          <label>
            <input
              type="radio"
              name="inputFront"
              value="false"
              checked={dstFront === false}
              onChange={handleChangeFront}
            />
            뒤
          </label>
        </div>
        <button type="submit">확인</button>
      </form>
    </Modal>
  );
}
