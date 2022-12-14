const { CustomError, asyncHandler } = require("../utils/lib");
const Tag = require("./../models/tagModel");
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
    _tag = await Tag.findByIdAndUpdate(_idTag, req.body, {
      new: true,
    });
  } else {
    _tag = await Tag.create(req.body);
  }

  console.log({
    status: "success",
    activated: _tag.activated,
    data: _tag,
  });

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
  console.log(req.body);
  const _tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log(await Tag.findById(req.params.id));

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
