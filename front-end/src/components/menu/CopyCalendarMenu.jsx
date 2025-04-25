import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../utils/Modal";

export default function CopyCalendarMenu({ setModalOption }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log();
    setModalOption(() => ({}));
  };

  const optionList = [];
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
          <label htmlFor="destPage">덮어쓸 페이지: </label>
          <select name="destPage">{optionList}</select>
        </div>
        <div>
          <label>덮어쓸 면: </label>
          <label>
            <input type="radio" name="destLayer" value={true} />앞
          </label>
          <label>
            <input type="radio" name="destLayer" value={false} />뒤
          </label>
        </div>
        <button type="submit">확인</button>
      </form>
    </Modal>
  );
}
