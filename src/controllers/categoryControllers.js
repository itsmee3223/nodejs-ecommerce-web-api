const asyncHandler = require("../middlewares/asyncHandler");
const CategoryModel = require("../models/categoryModel");

exports.getCategories = asyncHandler(async (req, res) => {
  const categoryList = await CategoryModel.find();
  if (!categoryList) {
    return res.status(500).json({
      status: "fail",
    });
  }

  return res.status(200).json({
    status: "success",
    data: categoryList,
  });
});

exports.getCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return res.status(404).json({
      status: "fail",
      message: `No category with id: ${req.params.id}`,
    });
  }

  return res.status(200).json({
    status: "success",
    data: category,
  });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, icon, color } = req.body;
  if (!name || !icon || !color) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide request body with valid format",
    });
  }
  const newCategory = new CategoryModel({ name, icon, color });
  await newCategory.save();

  return res.status(200).json({
    status: "success",
    data: newCategory,
  });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { name, icon, color } = req.body;
  if (!name || !icon || !color) {
    return res.status(400).json({
      message: "fail",
      message: "Please provide request body with valid format",
    });
  }

  const updatedCategory = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      icon,
      color,
    },
    { new: true }
  );
  if (!updatedCategory) {
    return res.status(404).json({
      status: "fail",
      message: `no category with id: ${req.params.id}`,
    });
  }

  return res.status(200).json({
    status: "success",
    message: "category has been updated",
    data: updatedCategory,
  });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!deletedCategory) {
    return res.status(404).json({
      status: "fail",
      message: `no category with id: ${req.params.id}`,
    });
  }

  return res.status(200).json({
    status: "success",
    message: "data has been deleted",
    data: deletedCategory,
  });
});
