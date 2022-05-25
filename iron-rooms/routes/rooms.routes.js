//TODO import the routes
const router = require("express").Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");
const Room = require("../models/Room.model");
const Review = require("../models/Review.model");
const User = require("../models/User.model");

router.get("/", async (req, res, next) => {
  try {
    await Review.find();
    const rooms = await Room.find(); // .populate("Review");

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
  const { session } = req;
  console.log({ session });

  try {
    const { name, description, imageUrl } = req.body;
    await Room.create({
      name,
      description,
      imageUrl,
      owner: req.session.user._id,
      // reviews,
    });

    res.redirect("/rooms");
  } catch (error) {
    next(error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    res.render("rooms/update-form", room);
  } catch (error) {
    console.log(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
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

router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Room.findByIdAndDelete(id);
    res.redirect("/rooms");
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    await Room.findById(req.params.id)
      // .populate("owner")
      .populate({ path: "reviews", populate: { path: "user" } })
      .then((results) => {
        res.render("rooms/room", results);
      });
  } catch (error) {}
});

module.exports = router;
