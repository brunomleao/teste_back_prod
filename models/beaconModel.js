const mongoose = require("mongoose");

const beaconSchema = new mongoose.Schema({
  beaconX: Number,
  beaconY: Number,
});

const Beacon = new mongoose.model("Beacon", beaconSchema);

module.exports = Beacon;
