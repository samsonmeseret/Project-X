const Expense = require("../model/expense");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const { StatusCodes } = require("http-status-codes");

exports.createExpense = CatchAsync(async (req, res, next) => {
  const savedExpense = await Expense.create({
    expenseName: req.body.expenseName,
    quantity: req.body.quantity,
    requestedBy: req.body.requestedBy,
    unitPrice: req.body.unitPrice,
  });

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: savedExpense,
  });
});

exports.findAllExpense = CatchAsync(async (req, res, next) => {
  const { expenseName, approval, sort } = req.query;

  let queryObject = {};

  if (approval) {
    queryObject.approval = approval === "true" ? true : false;
  }
  if (expenseName) {
    queryObject.expenseName = { $regex: expenseName, $options: "i" };
  }

  let result = Expense.find(queryObject);

  if (sort) {
    const sortlist = sort.split(",").join(" ");

    result = result.sort(sortlist);
  } else {
    result = result.sort("createdAt");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  console.log(queryObject);
  const data = await result;

  res.status(StatusCodes.OK).json({
    status: "success",
    total: data.length,
    data,
  });
});

exports.approveRequest = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const approved = await Expense.findByIdAndUpdate(
    { _id: id },
    { approval: true },
    { runValidators: false, new: true }
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    data: approved,
  });
});

exports.updateExpense = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updateObject = {};
  const { expenseName, quantity, price, requestedPerson } = req.body;
  if (expenseName) updateObject.expenseName = expenseName;
  if (quantity) updateObject.quantity = quantity;
  if (price) updateObject.price = price;
  if (requestedPerson) updateObject.requestedPerson = requestedPerson;
  const updatedExpense = await Expense.findByIdAndUpdate(
    { _id: id },
    updateObject,
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    data: updatedExpense,
  });
});

exports.getExpense = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const singleExpense = await Expense.findById({ _id: id });

  res.status(StatusCodes.OK).json({
    status: "success",
    data: singleExpense,
  });
});

exports.deleteExpense = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deletedExpense = await Expense.findByIdAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({
    status: "success",
    data: deletedExpense,
  });
});
