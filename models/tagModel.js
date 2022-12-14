const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
  },
  category: {
    type: String,
    default: "",
    trim: true,
  },
  macAddress: {
    type: String,
    required: [true, "macAddress is required"],
    unique: true,
  },
  isMoving: {
    type: Boolean,
    default: false,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  lastPosition: {
    type: Array,
    default: [0, 0],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tag = new mongoose.model("Tag", tagSchema);

module.exports = Tag;
