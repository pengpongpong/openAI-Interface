import axios from "axios";
import { setQueryData, setChatData } from "../types";


// query da vinci 03
export const getQuery = (query) => (dispatch) => {
  console.log("getQuery");
  axios
    .get("/api/query/newquery", query)
    .then((doc) => {
      console.log(doc.data.result);
      dispatch(setQueryData(doc.data.result));
    })
    .catch((err) => console.log(err.response.data));
};

// query gpt 3.5 turbo
export const getChat = (query) => (dispatch) => {
  axios
    .post("/api/query/newchat", { params: { result: query } })
    .then((doc) => {
      dispatch(
        setChatData({
          assistant: doc.data.result,
          user: doc.data.roles[doc.data.roles.length - 1].content,
        })
      );
    })
    .catch((err) => console.log(err.response.data));
};

