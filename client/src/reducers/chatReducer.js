import { createReducer } from "@reduxjs/toolkit";
import { SET_CHAT, RESET_CHAT } from "../actions/types";


const chatReducer = createReducer([], (builder) => {
  builder
    .addCase(SET_CHAT, (state, action) => {
      state.push(action.payload)
      // saveState(state);
    })
    .addCase(RESET_CHAT, (state, action) => {
      state = [];
    });
});

export default chatReducer;
