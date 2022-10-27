const ProductModel = require("../models/productModel");
const CategoryModel = require("../models/categoryModel");
const asyncHandler = require("../middlewares/asyncHandler");

exports.getProduct = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
    console.log(filter);
  }

  const productList = await ProductModel.find(filter).populate("category");
  if (!productList) {
    return res.status(200).json({
      status: "success",
      message: "no product",
      data: productList,
    });
  }

  return res.status(200).json({
    status: "success",
    data: productList,
  });
});

exports.createProdcut = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.body.category);
  if (!category) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid category",
    });
  }

  const file = req.file;
  if (!file) {
    return res.status(400).json({
      status: "fail",
      message: "No image",
    });
  }

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  const product = await ProductModel.create({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  return res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.body.category);
  if (!category) {
    return res.status(404).json({
      status: "fail",
      message: "category not found",
    });
  }

  const product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: file
        ? `${req.protocol}://${req.get("host")}/public/uploads/${file.filename}`
        : product.filename,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "product not found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.feturedProduct = asyncHandler(async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await ProductModel.find({ isFeatured: true }).limit(
    Number(count)
  );
  if (!products) {
    return res.status(404).json({
      status: "fail",
      message: "product not found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: products,
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findOneAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "product not found",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "product deleted",
    data: product,
  });
});
