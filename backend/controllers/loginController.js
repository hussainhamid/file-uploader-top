const passport = require("passport");
require("../config/passport");

async function loginPost(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({ success: true, user });
    });
  })(req, res, next);
}

module.exports = {
  loginPost,
};
