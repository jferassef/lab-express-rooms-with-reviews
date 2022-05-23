const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/rooms", require("./rooms.routes"));

module.exports = router;
