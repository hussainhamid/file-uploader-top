const Router = require("express");

const signUpRouter = Router();

const signUpPost = require("../controllers/signUpController");

signUpRouter.post("/", signUpPost);

module.exports = {
  signUpRouter,
};
