const mongoose = require("mongoose");
const User = require("../model/users");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");
const { StatusCodes } = require("http-status-codes");

const filterObj = (obj, ...allowedFilds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFilds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createUser = CatchAsync(async (req, res, next) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    passwordConform: req.body.passwordConform,
    //img: file.path
  });

  const savedUser = await newUser.save();
  res.status(StatusCodes.CREATED).json({
    massage: "success",
    data: savedUser,
  });
});

exports.findUser = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const foundUser = await User.findById({ _id: id });
  if (!foundUser) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "success",
      data: `No user found with ID : ${id}`,
    });
  } else {
    res.status(StatusCodes.OK).json({
      status: "success",
      data: foundUser,
    });
  }
});
exports.findAlluser = CatchAsync(async (req, res, next) => {
  const allUser = await User.find();
  if (!allUser) {
    res.status(StatusCodes.OK).json({
      status: "success",
      data: `there is no User in the system`,
    });
  } else {
    res.status(StatusCodes.OK).json({
      status: "success",
      data: allUser,
    });
  }
});

// updating user informations
exports.updateMe = CatchAsync(async (req, res, next) => {
  //1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConform) {
    return next(
      new AppError(
        "This route is for password update. Please use /updatePassword.",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  //2) Filtered Out unwanted fields
  const filteredBody = filterObj(req.body, "firstname", "lastname", "email");
  //3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success!",
    data: updatedUser,
  });
});

// deleting by the user = deActivating
exports.deleteMe = CatchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(StatusCodes.NO_CONTENT).json({
    status: "success",
    data: null,
  });
});

exports.deleteUser = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  deletedUser = await User.findByIdAndDelete({ _id: id }, { new: true });
  if (!deletedUser) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "success",
      message: `no user with ID: ${id}`,
    });
  } else {
    res.status(StatusCodes.OK).json({
      status: "success",
      data: { deletedUser },
    });
  }
});
