const Router = require("express");

logoutRouter = Router();

const { logoutController } = require("../controllers/logoutController");

logoutRouter.get("/", logoutController);

module.exports = {
  logoutRouter,
};
