const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// set openAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }
  const openai = new OpenAIApi(configuration);
  
  module.exports = openai;