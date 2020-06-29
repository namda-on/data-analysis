const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const OrderRouter = require("./router/order");
const CouponRouter = require("./router/coupon");
const CustomerRouter = require("./router/customer");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/order", OrderRouter);
app.use("/customer", CustomerRouter);
app.use("/coupon", CouponRouter);
app.use("/", (req, res, next) => {
  res.send("hello");
});

const port = 4001;
app.listen(port, () => {
  console.log(`listening in ${port}`);
});
