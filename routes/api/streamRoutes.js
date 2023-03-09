const express = require("express");
const router = express.Router();
const QueryModel = require("../../models/character");
const ChatModel = require("../../models/chatModel");
const createSession = require("better-sse").createSession;
require("dotenv").config();
const cors = require("cors")
let corsOptions = {
  origin: 'https://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get("/newquery", async (req, res) => {
  const session = await createSession(req, res);
  let prompt = req.query.ask;
  console.log("prompt router stream", prompt);

});

// save stream GPT 3.5 to database
router.post("/newchat", cors(corsOptions), (req, res) => {
  const { roles, result } = req.body;
  console.log("router", req.body)

  ChatModel.create({
    roles: roles,
    model: "gpt-3.5-turbo stream",
    result: result,
  }).then((doc) => {
    console.log("saving success", doc);
    res.json(doc);
  });
});

// router.get("/ticker", (req, res) => {
//   let dataSource = 0;
//   const updateDataSource = () => {
//     const delta = Math.random();
//     dataSource += delta;
//   };
//   res.statusCode = 200;
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("connection", "keep-alive");
//   res.setHeader("Content-Type", "text/event-stream");
//   setInterval(() => updateDataSource(), 500);
//   setInterval(() => {
//     const data = JSON.stringify({ ticker: dataSource });
//     res.write(`id: ${new Date().toLocaleTimeString()}\ndata: ${data}\n\n`);
//   }, 1000);
// });

module.exports = router;
