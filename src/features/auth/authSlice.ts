import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  accessToken: string,
  refreshToken: string,
  loggedIn: boolean
}

// Define the initial state using that type
const initialState = { accessToken: "", refreshToken: "", loggedIn: false } as AuthState

export const authSlice = createSlice({
  name: "auth",
   // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    }
  }
});

export const { setAccessToken, setRefreshToken, setLoggedIn  } = authSlice.actions;

export default authSlice.reducer;