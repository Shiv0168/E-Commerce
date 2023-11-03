const express = require("express");
const {
  postProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/Product");
const router = express.Router();

router.route("/").post(postProduct).get(getAllProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

module.exports = router;
