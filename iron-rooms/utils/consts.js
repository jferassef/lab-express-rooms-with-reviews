const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/iron-rooms";

module.exports = MONGO_URI;
