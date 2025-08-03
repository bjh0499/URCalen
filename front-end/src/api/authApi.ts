import api from "./axios";

import type SignUpInput from "../class/SignUpInput";
import type LoginInput from "../class/LoginInput";

const ENDPOINT = "/auth";
const authApi = {
  signup: async (formData: SignUpInput) => {
    const response = await api.post(`${ENDPOINT}/signup`, formData);
    return response;
  },

  login: async (formData: LoginInput) => {
    const response = await api.post(`${ENDPOINT}/login`, formData);
    return response;
  },

  verify: async () => {
    const response = await api.get(`${ENDPOINT}/verify`);
    return response;
  },
};

export default authApi;
