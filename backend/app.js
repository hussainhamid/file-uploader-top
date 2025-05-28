const express = require("express");
const app = express();
const cors = require("cors");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
require("./config/passport");

app.use(express.urlencoded({ extended: true }));

const { signUpRouter } = require("./routers/signUpRouter");

app.use(cors());

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    secret: "a secret",
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/sign-up", signUpRouter);

app.listen(3000, () => {
  console.log("app running on 3000");
});
