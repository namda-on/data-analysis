const express = require("express");
const db = require("../db");
const { models } = require("../db");
const ItemRouter = express.Router();

module.exports = ItemRouter;

// ItemRouter.post("/", async (req, res, next) => {
//   try {
//     const result = await models.shoes
//       .findAll()
//       .map(({ id, name, point, account, address }) => {
//         return { id, name, point, account, address };
//       });
//     res.send(result);
//   } catch (error) {
//     res.status(500).json({ error: error.toString() });
//   }
// });
