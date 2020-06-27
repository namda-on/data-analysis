const express = require("express");
const db = require("../db");
const { models } = require("../db");
const model = require("../model");
const OrderRouter = express.Router();

OrderRouter.post("/", async (req, res, next) => {
  const { customer_id, shoes_item, shoes_size, coupon_id, type } = req.body;
  console.log(req.body);

  await models.order
    .create({
      customer_id,
      shoes_item,
      shoes_size,
      coupon_id,
      type,
    })
    .catch((e) => {
      console.log(e);
    });
  res.send("완료");
});

module.exports = OrderRouter;
