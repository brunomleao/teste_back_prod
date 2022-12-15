const Category = require("../models/categoryModel");
const { asyncHandler, CustomError, groupBy } = require("../utils/lib");
const Tag = require("./../models/tagModel");
////////////////////////////////////////////////////////////////////////////////////

/**
 * ROUTE HANDLERS
 */
exports.getAllCategories = asyncHandler(async function (req, res) {
  const _categories = await Category.find();
  // const _stats = (
  //   await Tag.aggregate([
  //     {
  //       $group: {
  //         _id: "$category",
  //         results: { $sum: 1 },
  //       },
  //     },
  //     {
  //       $sort: { results: 1 },
  //     },
  //   ])
  // ).map(
  //   (el) =>
  //     new Object({
  //       name: el._id,
  //       results: el.results,
  //     })
  // );

  // const _flat = groupBy([_stats, _categories].flat(), "name");
  // let _data = [];
  // for (const [key, value] of Object.entries(_flat)) {
  //   const _spread = { ...value[0], ...value[1] };
  //   if (_spread.name === "") continue;

  //   let _temp = {};
  //   _temp.name = _spread._doc.name;
  //   _temp.results = _spread.results;
  //   _temp._id = _spread._doc._id;
  //   _data.push(_temp);
  // }

  res
    .status(200)
    .json({
      status: "success",
      results: _categories.length,
      data: _categories,
    })
    .end();
});

exports.createNewCategory = asyncHandler(async function (req, res, next) {
  const _category = await Category.create(req.body);
  res
    .status(201)
    .json({
      status: "success",
      data: _category,
    })
    .end();
});

exports.getCategory = asyncHandler(async function (req, res, next) {
  const _category = await Category.findById(req.params.id);

  if (!_category) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "success",
      data: { _category },
    })
    .end();
});

exports.updateCategory = asyncHandler(async function (req, res, next) {
  const _category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!_category) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "sucess",
      data: { _category },
    })
    .end();
});

exports.deleteCategory = asyncHandler(async function (req, res, next) {
  const _category = await Category.findByIdAndDelete(req.params.id);

  if (!_category) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "sucess",
      data: null,
    })
    .end();
});
