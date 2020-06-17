const express = require("express");
const cors = require("cors");
const app = express();
const CustomerRouter = require("./router/customer");
const ItemRouter = require("./router/item");
const OrderRouter = require("./router/order");
app.use(cors());
app.use(express.json());

app.use("/customer", CustomerRouter);
app.use("/item", ItemRouter);
app.use("/order", OrderRouter);
app.use("/", (req, res, next) => {
  res.send("hello");
});

const port = 4001;
app.listen(port, () => {
  console.log(`listening in ${port}`);
});
