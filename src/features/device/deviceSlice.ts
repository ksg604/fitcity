import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type deviceState = {
  isMobile: boolean
}

const initialState = { isMobile: (window.innerWidth < 769) } as deviceState

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload
    },
  }
});

export const { setIsMobile } = modalSlice.actions

export default modalSlice.reducer;