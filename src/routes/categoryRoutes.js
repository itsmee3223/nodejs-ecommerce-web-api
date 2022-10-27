const router = require("express").Router();

const categoryController = require("../controllers/categoryControllers");

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getCategories);

router
  .route("/:id")
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory)
  .get(categoryController.getCategory);

module.exports = router;
