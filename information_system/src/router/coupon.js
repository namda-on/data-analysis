const express = require("express");
const db = require("../db");
const { models } = require("../db");
const model = require("../model");
const CouponRouter = express.Router();
const couponCode = require("coupon-code");

//쿠폰생성
CouponRouter.post("/new", async (req, res, next) => {
  const { custid } = req.body;
  await models.coupon
    .create({
      coupon_id: couponCode.generate(),
      coupDiscount: 10,
      customer_id: custid,
    })
    .catch((e) => console.log(e));
  res.status(204).send("완료");
});

module.exports = CouponRouter;
