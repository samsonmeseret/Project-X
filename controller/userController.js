const mongoose = require("mongoose");
const User = require("../model/users");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");

exports.createUser = CatchAsync(async (req, res, next) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    passwordConform: req.body.passwordConform,
    role: req.body.role,
    //img: file.path
  });

  const savedUser = await newUser.save();
  res.status(200).json({
    massage: "success",
    data: { savedUser },
  });
});

exports.findUser = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const foundUser = await User.findById({ _id: id });
  if (!foundUser) {
    res.status(404).json({
      message: "success!",
      data: `no user found with id ${id}`,
    });
  } else {
    res.status(200).json({
      message: "success!",
      data: { foundUser },
    });
  }
});
exports.findAlluser = CatchAsync(async (req, res, next) => {
  const allUser = await User.find();
  if (!allUser) {
    res.status(200).json({
      message: "success!",
      data: `there is no User in the system`,
    });
  } else {
    res.status(200).json({
      message: "success!",
      data: { allUser },
    });
  }
});

exports.updateUser = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!updatedUser) {
    res.status(404).json({
      status: "success!",
      message: `no user with ID: ${id}`,
    });
  } else {
    res.status(200).json({
      status: "success!",
      data: { updatedUser },
    });
  }
});
exports.deleteUser = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  deletedUser = await User.findByIdAndDelete({ _id: id }, { new: true });
  if (!deletedUser) {
    res.status(404).json({
      status: "success!",
      message: `no user with ID: ${id}`,
    });
  } else {
    res.status(200).json({
      status: "success!",
      data: { deletedUser },
    });
  }
});
