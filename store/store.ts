import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";
export function makeStore() {
  return configureStore({
    reducer: {
      todo: todoReducer,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
