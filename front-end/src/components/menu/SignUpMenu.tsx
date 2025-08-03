import React from "react";
import { useState } from "react";

import authApi from "../../api/authApi";
import Modal from "../utils/Modal";

import type SignUpInput from "../../class/SignUpInput";

export default function SignUpMenu({ setModalOption }) {
  const [formData, setFormData] = useState<SignUpInput>({
    username: "",
    password: "",
    email: "",
    nickname: "",
  });

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
      await authApi.signup(formData);
      alert("회원 가입이 완료되었습니다.");
      setModalOption(() => ({}));
    } catch (err) {
      alert("회원 가입 과정에서 오류가 발생했습니다.");
      alert(err);
    } finally {
    }
  };

  return (
    <Modal>
      <h2>회원 가입</h2>
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
        <div>
          <label htmlFor="email">이메일: </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="이메일"
            value={formData.email}
            onChange={handleFormInput}
          />
        </div>
        <div>
          <label htmlFor="nickname">닉네임: </label>
          <input
            id="nickname"
            name="nickname"
            required
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleFormInput}
          />
        </div>
        <button type="submit">회원 가입</button>
      </form>
    </Modal>
  );
}
