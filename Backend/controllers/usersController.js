const { CustomError, asyncHandler } = require("../utils/lib");
const User = require("./../models/usersModel");
////////////////////////////////////////////////////////////////////////////////////

/**
 * ROUTE HANDLERS
 */

exports.getAllUsers = asyncHandler(async function (req, res, next) {
  const _users = await User.find();

  res
    .status(200)
    .json({
      status: "success",
      results: _users.length,
      data: _users,
    })
    .end();
});

exports.createNewUser = asyncHandler(async function (req, res, next) {
  const _user = await User.create(req.body);
  res
    .status(201)
    .json({
      status: "success",
      data: _user,
    })
    .end();
});

exports.getUser = asyncHandler(async function (req, res, next) {
  const _user = await User.findById(req.params.id);

  if (!_user) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "success",
      data: { _user },
    })
    .end();
});

exports.updateUser = asyncHandler(async function (req, res, next) {
  const _user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!_user) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "sucess",
      data: { _user },
    })
    .end();
});

exports.deleteUser = asyncHandler(async function (req, res, next) {
  const _user = await User.findByIdAndDelete(req.params.id);

  if (!_user) return next(new CustomError("ID not found", 404));

  res
    .status(200)
    .json({
      status: "sucess",
      data: null,
    })
    .end();
});
