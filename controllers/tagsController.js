const { CustomError, asyncHandler } = require("../utils/lib");
const { Triangulation } = require("./../utils/triangulation");
const Tag = require("./../models/tagModel");
const Beacon = require("./../models/beaconModel");
////////////////////////////////////////////////////////////////////////////////////

/**
 * ROUTE HANDLERS
 */
exports.getAllTags = asyncHandler(async function (req, res, next) {
  const _tags = await Tag.find(req.query);

  res
    .status(200)
    .json({
      status: "success",
      results: _tags.length,
      data: _tags,
    })
    .end();
});

exports.createNewTag = asyncHandler(async function (req, res, next) {
  const _beacon = await Beacon.findById("639b4d0223d6e4c974c4e9eb");

  const _coords = new Array();
  const _newTriang = new Triangulation();

  _newTriang.Triangulation(
    _beacon.beaconX,
    _beacon.beaconY,
    req.body.distances[0],
    req.body.distances[1],
    req.body.distances[2]
  );

  _coords[0] =
    _newTriang.pointXMedian() > 0
      ? (_newTriang.pointXMedian() / _beacon.beaconX) * 100
      : 0;
  _coords[1] =
    _newTriang.pointYMedian > 0
      ? (_newTriang.pointYMedian() / _beacon.beaconY) * 100
      : 0;

  req.body.lastPosition = _coords;
  console.log(req.body);

  const allTags = await Tag.find();

  let _tagExists = false;
  let _idTag = 0;
  allTags.forEach((tag) => {
    if (tag.macAddress === req.body.macAddress) {
      _tagExists = true;
      _idTag = String(tag._id);
    }
  });

  let _tag = new Object();
  if (_tagExists) {
    _tag = await Tag.findByIdAndUpdate(_idTag, req.body);
  } else {
    _tag = await Tag.create(req.body);
  }

  res
    .status(201)
    .json({
      status: "success",
      activated: _tag.activated,
      data: _tag,
    })
    .end();
});

exports.getTag = asyncHandler(async function (req, res, next) {
  const _tag = await Tag.findById(req.params.id);

  if (!_tag) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "success",
      data: { _tag },
    })
    .end();
});

exports.updateTag = asyncHandler(async function (req, res, next) {
  // const _lastPos = req.body.lastPosition;

  // const _newTriang = new Triangulation();
  // _newTriang.Triangulation(8, 13, _lastPos[0], _lastPos[1], _lastPos[2]);
  // const _coords = {
  //   lastPosition: [_newTriang.pointXMedian(), _newTriang.pointYMedian()],
  // };

  const _tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!_tag) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "sucess",
      data: { _tag },
    })
    .end();
});

exports.deleteTag = asyncHandler(async function (req, res, next) {
  const _tag = await Tag.findByIdAndDelete(req.params.id);

  if (!_tag) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "sucess",
      data: null,
    })
    .end();
});

exports.setBeacons = asyncHandler(async function (req, res, next) {
  const _beacons = await Beacon.findByIdAndUpdate(
    "639b4d0223d6e4c974c4e9eb",
    req.body,
    { new: true }
  );

  res
    .status(200)
    .json({
      status: "sucess",
      data: { beacons: _beacons },
    })
    .end();
});
