import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/modal/modalSlice";
import deviceReducer from "./features/device/deviceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    device: deviceReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;