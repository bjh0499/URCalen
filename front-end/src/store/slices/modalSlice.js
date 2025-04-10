import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  modalArg: null,
};

const modalSlice = createSlice({
  name: "selectedMonth",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.type = action.payload.type;
      state.modalArg = action.payload.modalArg;
    },
    resetModal: (state, action) => {
      state.type = null;
      state.modalArg = null;
    },
  },
});

export const { setModal, resetModal } = modalSlice.actions;
export default modalSlice.reducer;
