import api from "./axios";

const ENDPOINT = "/customcalendars";
const customCalendarApi = {
  createCustomCalendar: async (customCalendar) => {
    const response = await api.post(`${ENDPOINT}`, customCalendar);
    return response;
  },
};

export default customCalendarApi;
