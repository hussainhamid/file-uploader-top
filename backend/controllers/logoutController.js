require("../config/passport");

async function logoutController(req, res) {
  req.logout((err) => {
    if (err) {
      console.error("error in logoutController:", err);
      return res.status(500).json({ logout: false });
    }

    return res.status(200).json({ logout: true, user: false });
  });
}

module.exports = {
  logoutController,
};
