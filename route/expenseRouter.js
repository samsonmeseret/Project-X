const express = require("express");
const Router = express.Router();
const expenseController = require("../controller/expenseController");
const AuthController = require("../controller/AuthController");

Router.use(AuthController.protect);
Router.use(AuthController.restrictTo("reception", "admin"));
Router.route("/expense")
  .get(expenseController.findAllExpense)
  .post(expenseController.createExpense);
Router.route("/expense/:id")
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

Router.use(AuthController.restrictTo("admin"));
Router.route("/expense/:id/approve").patch(expenseController.approveRequest);

module.exports = Router;
