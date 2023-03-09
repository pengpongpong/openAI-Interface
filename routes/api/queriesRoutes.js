const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const QueryModel = require("../../models/character");
const ChatModel = require("../../models/chatModel");

// Da Vinci 03
router.post("/newquery", (req, res) => {
  const input = req.body.request;
  console.log("query", req.body);

  (async () => {
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        temperature: 0.6,
        max_tokens: 250,
      });

      if (completion) {
        const result = completion.data.choices[0].text;
        console.log("result", result);
        QueryModel.create({
          query: input,
          model: "text-davinci-003",
          result: result,
        }).then((doc) => {
          res.json(doc);
        });
      }
    } catch (err) {
      console.log(err);
    }
  })();
})

// GPT 3.5 Turbo
router.post("/newchat", (req, res) => {
    // get
    // const roles = req.query.result?.roles;
    // const settings = req.query.result?.settings;

    // post
    const { roles, settings } = req.body.params.result;
    let current_date = new Date().toUTCString();
  
    const setting =
      settings !== ""
        ? {
            role: "system",
            content: settings,
          }
        : {
            role: "system",
            content: `You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Current date: ${current_date}`,
          };
    let messageData = [setting].concat(roles);
  
    // if (roles) {
    //   (async () => {
    //     console.log(messageData);
    //     try {
    //       const completion = await openai
    //         .createChatCompletion({
    //           model: "gpt-3.5-turbo",
    //           messages: messageData,
    //           stream: false,
    //         })
    //         .then((chat) => {
    //           const result = chat.data.choices[0].message.content;
    //           ChatModel.create({
    //             roles: roles,
    //             model: "gpt-3.5-turbo new NPC",
    //             result: result,
    //           }).then((doc) => {
    //             console.log("saving success", doc);
    //             res.json(doc);
    //           });
    //         });
    //     } catch (err) {
    //       console.log("error router", err.response);
    //     }
    //   })();
    // }
  });

module.exports = router;