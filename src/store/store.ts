import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import TodoSlice from "./slices/TodoSlice";

export const store = configureStore({
  reducer: {
    UserReducer : UserSlice,
    TodoReducer : TodoSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
