const express = require("express");
const Router = express.Router();
const expenseController = require("../controller/expenseController");
const AuthController = require("../controller/AuthController");

Router.use(AuthController.protect);
Router.use(AuthController.restrictTo("reception", "admin"));
Router.route("/expense")
  .get(expenseController.findAllExpense)
  .post(expenseController.requestExpense);
Router.route("/expense/:id")
  .patch(expenseController.updateUnApprovedExpense)
  .delete(expenseController.deleteExpense)
  .get(expenseController.getExpense);

Router.use(AuthController.restrictTo("admin"));
Router.route("/admin/expense/:id")
  .patch(expenseController.approveRequest)
  .delete(expenseController.deleteExpenseByAdmin);

Router.route("/Expense/stat/:year").get(
  expenseController.getMonthlyExpenseStat
);

module.exports = Router;
