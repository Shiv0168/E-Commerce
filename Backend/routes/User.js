const express = require("express");
const {
  postUser,
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/User");
const router = express.Router();

router.route("/").post(postUser).get(getAllUser);
router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
