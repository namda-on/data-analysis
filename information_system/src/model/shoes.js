const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (Sequelize, sequelize) => {
  const shoes = sequelize.define("shoes", {
    item: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    size: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      allowNull: false,
    },
    inventory: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
    },
  });
  shoes.sync();
  return shoes;
};
