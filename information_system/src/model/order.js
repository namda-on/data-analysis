const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (Sequelize, sequelize) => {
  const order = sequelize.define("order", {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    shoes_ShoesPrice_item: {
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
    coupon: {
      type: Sequelize.INTEGER(1),
      defaultValue: 0,
      allowNull: false,
    },
  });
  order.sync();
  return order;
};
