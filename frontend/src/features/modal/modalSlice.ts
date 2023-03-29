import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type modalState = {
  isOpen: boolean
}

const initialState = { isOpen: false } as modalState

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  }
});

export const { setModalIsOpen } = modalSlice.actions

export default modalSlice.reducer;