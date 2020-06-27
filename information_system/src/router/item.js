const express = require("express");
const db = require("../db");
const { models } = require("../db");
const ItemRouter = express.Router();
const showInventory = require("../lib/showInventory");
const { restart } = require("nodemon");

//재고량 보여주기
ItemRouter.post("/", async (req, res, next) => {
  try {
    const reqitems = req.body;
    console.log(req.body);
    const result = await showInventory(reqitems);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

//가격 보여주기
ItemRouter.post("/price", async (req, res, next) => {
  try {
    const { item } = req.body;
    const shoesPrice = await models.shoes
      .findAll({
        where: {
          item,
        },
      })
      .map(({ price }) => {
        return price;
      });
    res.send(shoesPrice);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = ItemRouter;
