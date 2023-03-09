const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuerySchema = new Schema({
    query: {type: String, required: true},
    model: {type: String, required: true},
    result: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

const QueryModel = mongoose.model("openaiQuery", QuerySchema)

module.exports = QueryModel