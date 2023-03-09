import axios from "axios";

export const saveQuery = (query) => (dispatch) => {
  console.log("getQueryStream");
};

// save to database
export const saveGPTStream = (stream) => (dispatch) => {
  console.log("saveGPTStream");
  axios
    .post("/api/stream/newchat", stream)
    .then((doc) => {
      console.log(doc.data);
    })
    .catch((err) => console.log(err.response.data));
};

