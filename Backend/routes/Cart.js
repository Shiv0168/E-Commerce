const express = require("express");
const {
  postCart,
  updateCartById,
  deleteCartById,
  getCartByUser,
} = require("../controllers/Cart");

const router = express.Router();

router.route("/").get(getCartByUser).post(postCart);
router.route("/:id").put(updateCartById).delete(deleteCartById);

module.exports = router;
