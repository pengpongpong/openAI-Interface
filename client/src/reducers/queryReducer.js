import { SET_QUERY_DATA, SET_STREAM_QUERY } from "../actions/types";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {stream: ""};

const queryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_QUERY_DATA, (state, action) => {
      state.result = action.payload;
    })
    .addCase(SET_STREAM_QUERY, (state, action) => {
      state.stream = state.stream + action.payload
    });
});

export default queryReducer;
