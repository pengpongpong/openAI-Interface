const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const streamRoutes = require("./routes/api/streamRoutes");
const queriesRoutes = require("./routes/api/queriesRoutes");
const cors = require("cors")
let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const app = express();

// enable CORS
app.use(cors(corsOptions))

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// DB Config
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "openai",
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/stream", streamRoutes);
app.use("/api/query", queriesRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));