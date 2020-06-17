const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (Sequelize, sequelize) => {
  const customer = sequelize.define("customer", {
    id: {
      type: Sequelize.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    point: {
      type: Sequelize.INTEGER(10),
      defaultValue: 0,
      allowNull: true,
    },
    account: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    custRank_ranking: {
      type: Sequelize.STRING(10),
      defaultValue: "silver",
      references: {
        model: "custrank",
        key: "ranking",
      },

      allowNull: false,
    },
  });

  customer.sync();
  return customer;
};
