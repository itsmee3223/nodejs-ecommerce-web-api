const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const asyncHandler = require("../middlewares/asyncHandler");
const UserModel = require("../models/userModel");

exports.getUsers = asyncHandler(async (req, res) => {
  const userList = await UserModel.find().select("-password");

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "no user found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: userList,
  });
});

exports.getUser = asyncHandler(async (req, res) => {
  const user = UserModel.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: `no user found with id ${req.params.id}`,
    });
  }

  return res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.createUser = asyncHandler(async (req, res) => {
  const user = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "can't create user try again later",
    });
  }

  return res.status(200).json({
    status: "success",
    data: user.select("-password"),
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: `user not found with id: ${req.params.id}`,
    });
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "invalid credentials",
    });
  }

  const isPassword = await bcrypt.compare(req.body.password, user.password);
  if (user && isPassword) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
    return res.status(200).json({
      status: "success",
      user: user.email,
      token,
    });
  }

  return res.status(400).json({
    status: "fail",
    message: "invalid credentials",
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: `no user found with id: ${req.params.id}`,
    });
  }

  return res.status(200).json({
    status: "success",
    message: "user has been deleted",
  });
});
