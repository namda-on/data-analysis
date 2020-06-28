const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (Sequelize, sequelize) => {
  const ordering = sequelize.define("ordering", {
    order_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    shoes_item: {
      type: Sequelize.STRING(50),
      references: {
        model: "shoes",
        key: "item",
      },
      allowNull: false,
    },
    shoes_size: {
      type: Sequelize.INTEGER(5),
      references: {
        model: "shoes",
        key: "size",
      },
      allowNull: false,
    },
    orderdate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now"),
      allowNull: false,
    },
    type: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
    },
    coupon_yes: {
      type: Sequelize.INTEGER(1),
      defaultValue: 0,
      allowNull: false,
    },
    customer_id: {
      type: Sequelize.STRING(50),
      references: {
        model: "customer",
        key: "id",
      },
      allowNull: false,
    },
    order_price: {
      type: Sequelize.INTEGER(20),
      allowNull: false,
    },
  });
  ordering.sync();
  return ordering;
};
