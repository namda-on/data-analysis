const express = require("express");
const db = require("../db");
const { models } = require("../db");
const model = require("../model");
const CustomerRouter = express.Router();
const couponCode = require("coupon-code");

//회원리스트
CustomerRouter.get("/list", async (req, res, next) => {
  try {
    const result = await models.customer
      .findAll()
      .map(({ id, name, point, account, address }) => {
        return { id, name, point, account, address };
      });
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

CustomerRouter.post("/login", async (req, res, next) => {
  try {
    const { id, pw } = req.body;
    console.log(req.body);
    console.log(id, pw);

    const user = await models.customer.findOne({
      where: {
        id,
        password: pw,
      },
    });

    if (!user) {
      res.status(500).json({ error: "없어임마" });
      return;
    }
    console.log(user);

    res.cookie("login", JSON.stringify(user.dataValues));
    res.status(200).send("");
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

CustomerRouter.get("/logout", (req, res, next) => {
  res.clearCookie("login");

  res.send("");
});

//자신의 정보열람
CustomerRouter.get("/:id", async (req, res, next) => {
  try {
    const customerid = req.params.id;
    const result = await models.customer.findone({
      where: {
        id: customerid,
      },
    });
    console.log(result.dataValues);
    res.json(result.dataValues);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

//회원가입
CustomerRouter.post("/add", async (req, res, next) => {
  const { id, pw, name, account, address } = req.body;
  console.log(req.body);
  await models.customer
    .create({
      id,
      password: pw,
      name,
      account,
      address,
    })
    .catch((e) => res.status(500).json(e));
  await models.coupon.create({
    coupon_id: couponCode.generate(),
    coupDiscount: 10,
    customer_id: id,
  });
  res.status(204).send("완료");
});

//회원정보갱신 포인트 + 회원등급
CustomerRouter.post("/change", async (req, res, next) => {
  const { id, point, custrank } = req.body;
  await models.customer
    .update(
      {
        point: point,
        custrank: custrank,
      },
      { where: { id: id } }
    )
    .catch((e) => console.log(e));
  res.status(204).send("완료");
});
module.exports = CustomerRouter;
