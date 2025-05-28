const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/query");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getEverything(username);

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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.checksUser(id);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    console.error("error in deserialize user: ", err);
  }
});
