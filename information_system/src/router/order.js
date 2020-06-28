const express = require("express");
const db = require("../db");
const { models } = require("../db");
const model = require("../model");
const OrderRouter = express.Router();

OrderRouter.get("/:item/:size", async (req, res, next) => {
  const reqShoes = req.params.item;
  const reqSize = req.params.size;
  try {
    const result = await models.shoes.findOne({
      where: {
        item: reqShoes,
        size: reqSize,
      },
    });

    console.log(result.dataValues);
    res.json(result.dataValues);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

OrderRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  console.log(req.params.id);
  try {
    const data = await models.order.findOne({
      where: {
        order_id: id,
      },
    });

    console.log(data);

    res.json(data.dataValues);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

OrderRouter.post("/add", async (req, res, next) => {
  const {
    customer_id,
    shoes_item,
    shoes_size,
    coupon_yes,
    type,
    order_price,
  } = req.body;
  console.log(req.body);

  const cust = await models.customer.findOne({
    where: {
      id: customer_id,
    },
  });

  const shoes = await models.shoes.findOne({
    where: {
      item: shoes_item,
      size: shoes_size,
    },
  });

  console.log(shoes.dataValues);
  if (!type && !shoes.dataValues.inventory) {
    res.status(500).json({ error: "다떨어짐 ㅠ" });
    return;
  }

  const createOrderResult = await models.order
    .create({
      customer_id,
      shoes_item,
      shoes_size,
      coupon_yes,
      type,
      order_price,
    })
    .catch((e) => {
      console.log(e);
    });
  console.log(createOrderResult.dataValues);

  await models.shoes.update(
    {
      inventory: shoes.dataValues.inventory + (type == 0 ? -1 : 1),
    },
    {
      where: { item: shoes_item, size: shoes_size },
    }
  );

  await models.customer.update(
    {
      point: cust.dataValues.point + order_price * 0.0005,
    },
    {
      where: { id: customer_id },
    }
  );

  res.json({ id: createOrderResult.dataValues.order_id });
});

module.exports = OrderRouter;
