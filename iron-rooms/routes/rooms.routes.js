//TODO import the routes
const router = require("express").Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");
const Room = require("../models/Room.model");

router.get("/", async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.render("rooms/rooms", {
      rooms,
      isLoggedIn: req.session.currentUser,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/create", (req, res, next) => {
  res.render("rooms/room-create");
});

router.post("/create", async (req, res, next) => {
  try {
    const { name, description, imageUrl, owner, reviews } = req.body;
    await Room.create({
      name,
      description,
      imageUrl,
      owner,
      reviews,
    });

    res.redirect("/rooms");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
