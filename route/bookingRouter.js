const express = require("express");
const Router = express.Router();
const bookingController = require("../controller/bookingController");
const AuthController = require("../controller/AuthController");

Router.route("/book")
  .get(AuthController.protect, bookingController.findAllBooking)
  .post(bookingController.bookIn);
Router.route("/book/:id")
  .get(AuthController.protect, bookingController.getSigleBook)
  .delete(AuthController.protect, bookingController.deleteBooking);

module.exports = Router;
