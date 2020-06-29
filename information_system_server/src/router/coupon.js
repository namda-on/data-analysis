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

//쿠폰조회
CouponRouter.get("/:id", async (req, res, next) => {
  try {
    const customerid = req.params.id;
    const result = await models.coupon.findOne({
      where: {
        customer_id: customerid,
      },
    });
    console.log(result.dataValues);

    res.json(result.dataValues);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = CouponRouter;
