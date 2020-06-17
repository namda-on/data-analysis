const Sequelize = require("sequelize");
const model = require("../model");

const sequelize = new Sequelize("mydb", "root", "skaekdhsejxmfor", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database: ", err);
  });

const models = model(Sequelize, sequelize);

module.exports = {
  Sequelize,
  sequelize,
  models,
};
