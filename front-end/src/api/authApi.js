import api from "./axios";

const ENDPOINT = "/auth";
const authApi = {
  signup: async (formData) => {
    const response = await api.post(`${ENDPOINT}/signup`, formData);
    return response;
  },

  login: async (formData) => {
    const response = await api.post(`${ENDPOINT}/login`, formData);
    return response;
  },
};

export default authApi;
