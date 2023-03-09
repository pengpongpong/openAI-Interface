import { createAction } from "@reduxjs/toolkit";

export const SET_QUERY_DATA = "SET_QUERY_DATA";
export const RESET_QUERY = "RESET_QUERY";
export const SET_CHAT = "GET_CHAT";
export const RESET_CHAT = "RESET_CHAT";
export const SET_STREAM_QUERY = "SET_STREAM_QUERY";

// action
export const getStream = createAction(SET_STREAM_QUERY);
export const setChat = createAction(SET_CHAT);
export const setQueryData = createAction(SET_QUERY_DATA);
export const setChatData = createAction(SET_CHAT);
export const resetChatData = createAction(RESET_QUERY);

