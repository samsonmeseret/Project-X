const mongoose = require("mongoose");
const Course = require("../model/course");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");

exports.createCourse = CatchAsync(async (req, res, next) => {
  const newCourse = new Course({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    
    //photo: file.path
  });

  const savedCourse = await newCourse.save();
  res.status(200).json({
    massage: "success",
    data: { savedCourse }
  });
});


exports.findCourse = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const foundCourse = await Course.findById({ _id: id });
  if (!foundCourse) {
    res.status(404).json({
      message: "success!",
      data: `no user found with id ${id}`
    });
  } else {
    res.status(200).json({
      message: "success!",
      data: { foundCourse }
    });
  }
});
exports.findAllCourse = CatchAsync(async (req, res, next) => {
  const allCourse = await Course.find();
  if (!allCourse) {
    res.status(200).json({
      message: "success!",
      data: `there is no User in the system`
    });
  } else {
    res.status(200).json({
      message: "success!",
      data: { allCourse }
    });
  }
});

exports.updateCourse = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedCourse = await Course.findByIdAndUpdate({ _id: id }, req.body, {
    new: true
  });
  if (!updatedCourse) {
    res.status(404).json({
      status: "success!",
      message: `no user with ID: ${id}`
    });
  } else {
    res.status(200).json({
      status: "success!",
      data: { updatedCourse }
    });
  }
});
exports.deleteCourse = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  deletedCourse = await Course.findByIdAndDelete({ _id: id }, { new: true });
  if (!deletedCourse) {
    res.status(404).json({
      status: "success!",
      message: `no user with ID: ${id}`
    });
  } else {
    res.status(200).json({
      status: "success!",
      data: { deletedCourse }
    });
  }
});

 