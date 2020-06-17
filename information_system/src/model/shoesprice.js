const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (Sequelize, sequelize) => {
  const shoesprice = sequelize.define("shoesprice", {
    item: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
  });
  shoesprice.sync();
  return shoesprice;
};
