const express = require("express");
const db = require("../db");
const { models } = require("../db");
const CustomerRouter = express.Router();

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

//자신의 정보열람
CustomerRouter.get("/:id", async (req, res, next) => {
  try {
    const customerid = req.params.id;
    const result = await models.customer
      .findAll({
        where: {
          id: customerid,
        },
      })
      .map(({ name, point, account, address }) => {
        return { name, point, account, address };
      });
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

//회원가입
CustomerRouter.post("/add", async (req, res, next) => {
  try {
    const { id, name, point, account, address, custRank_ranking } = req.body;
    console.log(id);
    await models.customer.create({
      id,
      name,
      account,
      address,
    });
    res.status(204);
  } catch {
    res.status(500).json({ error: error.toString() });
  }
});

// CustomerRouter.get("/", async (req, res, next) => {
//   const allUser = await CustomerModel.getAllCustomer();

//   res.json(allUser);
// });

// CustomerRouter.post("/", async (req, res, next) => {
//   if (!validateCustomerRequest(req.body)) {
//     res.status(400).json(new ErrorMessageDTO(false, "Invalid Request"));
//     return;
//   }

//   const newCustomer = req.body;
//   const result = await CustomerModel.createCustomer(req.body);

//   console.log(result);
//   res.json(newCustomer);
// });

// CustomerRouter.delete("/:id", async (req, res, next) => {
//   if (!isValidPositiveInteger(req.params.id)) {
//     res.status(400).json(new ErrorMessageDTO(false, "Invalid Request"));
//     return;
//   }

//   const id = parseInt(req.params.id);
//   const data = await CustomerModel.deleteCustomer(id);
//   console.log(data);
//   res.json({
//     result: "success",
//   });
// });

module.exports = CustomerRouter;
