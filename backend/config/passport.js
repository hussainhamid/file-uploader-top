const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/query");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const rows = await db.getEverything(username);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "user does not exists" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "wrong password" });
      }

      return done(null, user);
    } catch (err) {
      console.error("error in localstrategy: ", err);
      return done(err);
    }
  })
);
