const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (Sequelize, sequelize) => {
  const custrank = sequelize.define("custrank", {
    ranking: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    discountRate: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
  });
  custrank.sync();
  return custrank;
};
