import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "./reducers/queryReducer";
import chatReducer from "./reducers/chatReducer";

const initialState = {};

const store = configureStore({
  reducer: {
    query: queryReducer,
    chat: chatReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  initialState,
  enhancers: [],
});

export default store;
