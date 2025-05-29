const Router = require("express");

const loginRouter = Router();

const { loginPost } = require("../controllers/loginController");

loginRouter.post("/", loginPost);

module.exports = {
  loginRouter,
};
