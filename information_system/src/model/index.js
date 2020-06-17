const customerModel = require("./customer");
const shoesModel = require("./shoes");
const orderModel = require("./order");
const couponModel = require("./coupon");
const custrankModel = require("./custrank");
const shoespriceModel = require("./shoesprice");
const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (Sequelize, sequelize) => {
  const customer = customerModel(Sequelize, sequelize);

  return {
    customer,
    shoesModel,
    orderModel,
    couponModel,
    custrankModel,
    shoespriceModel,
  };
};
