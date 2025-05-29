const db = require("../db/query");
const bcrypt = require("bcryptjs");

async function signUpPost(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("creating user:", username);

    const user = await db.createUser(username, email, hashedPassword);

    console.log("created user:", user);

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({ success: true, user });
    });
  } catch (err) {
    console.log("error in signUpController.js: ", err);
    return res.status(500).json({ success: false, message: "signup failed" });
  }
}

module.exports = {
  signUpPost,
};
