import React, { useState } from "react";
import { useDispatch } from "react-redux";

import authApi from "../../../api/authApi";
import { login } from "../../../store/slices/authSlice";

export default function LoginMenu({ setLoginMenu }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.login(formData);
      const { token } = response.data.data;
      dispatch(login(token));

      alert("로그인이 완료되었습니다.");
      setLoginMenu(() => false);
    } catch (err) {
      alert("로그인 과정에서 오류가 발생했습니다.");
      alert(err);
    } finally {
    }
  };

  return (
    <div
      className="style-menu-box bg-slate-100 z-100"
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        zIndex: "100",
        height: "400px",
        marginTop: "-200px",
        width: "600px",
        marginLeft: "-300px",
      }}
      onClick={handleMenuClick}
    >
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">계정명: </label>
          <input
            id="username"
            name="username"
            required
            placeholder="계정명"
            value={formData.username}
            onChange={handleFormInput}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호: </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleFormInput}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
