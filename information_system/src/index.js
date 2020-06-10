const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
console.log(process.env.DB_PORT);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", (req, res, next) => {
  res.send("hell");
});

app.listen(4000, () => {
  console.log("listening in 4000");
});
