const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

/**
 * routes middleware
 */
router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser);
router
  .route("/:id")
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
