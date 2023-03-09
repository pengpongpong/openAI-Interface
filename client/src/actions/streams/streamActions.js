import axios from "axios";

export const saveQuery = (query) => (dispatch) => {
  console.log("getQueryStream");
};

// save to database
export const saveGPTStream = (stream) => (dispatch) => {
  axios
    .post("http://localhost:4000/api/stream/newchat", stream, {
      headers: { "Content-Type": "application/json" },
    })
    .then((doc) => {
      console.log(doc.data);
    })
    .catch((err) => console.log(err.response.data));
};
