const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "category is required"],
    trim: true,
  },
});

const User = new mongoose.model("User", usersSchema);

module.exports = User;
