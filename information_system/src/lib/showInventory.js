const { models } = require("../db");

const showInventory = async (reqitems) => {
  const req_inventory = await models.shoes
    .findAll({
      where: {
        item: reqitems["item"],
        size: reqitems["size"],
      },
    })
    .map(({ inventory }) => {
      return inventory;
    });

  return req_inventory;
};

module.exports = showInventory;
