//TODO import the routes
const router = require("express").Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");
const Room = require("../models/Room.model");

router.get("/", async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.render("rooms/rooms", {
      rooms,
      // isLoggedIn: req.session.currentUser,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/room-create", (req, res, next) => {
  res.render("rooms/room-create");
});

router.post("/room-create", async (req, res, next) => {
  try {
    const { name, description, imageUrl, owner, reviews } = req.body;
    await Room.create({
      name,
      description,
      imageUrl,
      owner,
      reviews,
    });

    res.redirect("rooms/rooms");
  } catch (error) {
    next(error);
  }
});

router.get("/rooms/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    res.render("rooms/update-form", room);
  } catch (error) {
    console.log(error);
  }
});

router.post("/rooms/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, owner, reviews } = req.body;
    await Room.findByIdAndUpdate(
      id,
      { name, description, imageUrl, owner, reviews },
      { new: true }
    );
    res.redirect("/rooms");
  } catch (error) {
    console.log(error);
  }
});

router.post("/rooms/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Room.findByIdAndDelete(id);
    res.redirect("/rooms");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
