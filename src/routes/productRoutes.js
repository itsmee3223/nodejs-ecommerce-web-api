const router = require("express").Router();

const productController = require("../controllers/productControllers");
const uploadImage = require("../middlewares/uploadImage");

router
  .route("/")
  .post(uploadImage.single("image"), productController.createProdcut)
  .get(productController.getProduct);

router.get("/featured-product", productController.feturedProduct);

router
  .route("/:id")
  .put(uploadImage.single("image"), productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
