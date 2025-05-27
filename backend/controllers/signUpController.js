const db = require("../db/query");
const bcrypt = require("bcryptjs");

async function signUpPost(req, res, next) {
  try {
    const { username, email } = req.body;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await db.createUser(username, email, hashedPassword);
    res.status(200).json({ message: "user created successfully" });
  } catch (err) {
    console.log("error in signUpController.js: ", err);
  }
}

module.exports = {
  signUpPost,
};
