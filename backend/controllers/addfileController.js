async function addFileFunc(req, res) {
  try {
    res.json({ success: true });
  } catch (err) {
    console.error("error in addFileFunc: ", err);
    res.json({ success: false });
  }
}

module.exports = {
  addFileFunc,
};
