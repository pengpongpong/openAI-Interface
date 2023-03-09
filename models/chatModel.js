const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    roles: { type: [{ role: String, content: String }], required: true },
    model: { type: String, required: true },
    result: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const ChatModel = mongoose.model("openaiChat", ChatSchema)

module.exports = ChatModel