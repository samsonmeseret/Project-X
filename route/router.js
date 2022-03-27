const express = require("express");
const Router = express.Router();
const userController = require("../controller/userController");
const courseController = require("../controller/courseController");
const AuthController = require("../controller/AuthController");
const imageHanddler = require("../middlewares/imageHanddler");
//Auth
Router.route("/signup").post(AuthController.signup);
Router.route("/login").post(AuthController.login);
Router.route("/user/forgotPassword").post(AuthController.forgotPassword);
Router.route("/user/resetPassword/:token").patch(AuthController.resetPassword);
Router.route("/user/updateMyPassword").patch(
  AuthController.protect,
  AuthController.updatePassword
);
//User Activity
//1) updating his profiles!
Router.route("/user/updateMe").patch(
  AuthController.protect,
  userController.updateMe
);
//2) Deleting himself
Router.route("/user/deleteMe").delete(
  AuthController.protect,
  userController.deleteMe
);

//NOT Immplemented yet!
Router.route("/")
  .get(AuthController.protect, userController.findAlluser)
  .post(userController.createUser);
// Router.route("/:id")
//   .get(
//     AuthController.protect,
//     AuthController.restrictTo("admin"),
//     userController.findUser
//   )
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);
// //NOT IMplemented yet
// Router.route("/course")
//   .get(courseController.findAllCourse)
//   .post(courseController.createCourse);
// Router.route("/course/:id")
//   .get(courseController.findCourse)
//   .patch(courseController.updateCourse)
//   .delete(courseController.deleteCourse);

// Router.route("/image").post(imageHanddler);

module.exports = Router;
