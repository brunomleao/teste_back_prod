const express = require("express");
const tagsController = require("./../controllers/tagsController");

const router = express.Router();

/**
 * routes middleware
 */
router.route("/beacons").patch(tagsController.setBeacons);

router
  .route("/")
  .get(tagsController.getAllTags)
  .post(tagsController.createNewTag);
router
  .route("/:id")
  .get(tagsController.getTag)
  .patch(tagsController.updateTag)
  .delete(tagsController.deleteTag);

module.exports = router;
