const customerModel = require("./customer");
const shoesModel = require("./shoes");
const orderModel = require("./ordering");
const couponModel = require("./coupon");
const custrankModel = require("./custrank");
const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (Sequelize, sequelize) => {
  const customer = customerModel(Sequelize, sequelize);
  const shoes = shoesModel(Sequelize, sequelize);
  const order = orderModel(Sequelize, sequelize);
  const coupon = couponModel(Sequelize, sequelize);
  const custrank = custrankModel(Sequelize, sequelize);
  return {
    customer,
    shoes,
    order,
    coupon,
    custrank,
  };
};
