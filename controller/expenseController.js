const Expense = require("../model/expense");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const { StatusCodes } = require("http-status-codes");

exports.requestExpense = CatchAsync(async (req, res, next) => {
  const expense = new Expense({
    expenseName: req.body.expenseName,
    quantity: req.body.quantity,
    requestedBy: req.user.firstname + " " + req.user.lastname,
    unitPrice: req.body.unitPrice,
  });
  const savedExpense = await expense.save();

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: savedExpense,
  });
});
exports.getMonthlyStat = CatchAsync(async (req, res, next) => {
  const year = req.params.year;
  const stats = await Expense.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
        totalPrice: { $gte: 0 },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        numExpenses: { $sum: 1 },
        totalPrice: { $sum: "$totalPrice" },
        expenseName: { $push: "$expenseName" },
      },
    },
    {
      $addFields: {
        Month: {
          $arrayElemAt: [
            [
              "",
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            "$_id",
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]).limit(12);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: stats,
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
  let approvalObjc = {};
  const { approval } = req.body;
  if (approval) approvalObjc.approval = approval === "true" ? true : false;

  const approved = await Expense.findByIdAndUpdate({ _id: id }, approvalObjc, {
    runValidators: false,
    new: true,
  });

  res.status(StatusCodes.OK).json({
    status: "success",
    data: approved,
  });
});

exports.updateUnApprovedExpense = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  // const updateObject = {};
  const { expenseName, quantity, unitPrice, requestedBy } = req.body;

  const data = await Expense.findById({ _id: id });
  if (data.approval === true) {
    return next(new AppError("you can not update Approved Expenses"));
  } else {
    const expense = await Expense.findById({ _id: id });
    if (expenseName) expense.expenseName = expenseName;
    if (quantity) expense.quantity = quantity;
    if (unitPrice) expense.unitPrice = unitPrice;
    if (requestedBy) expense.requestedBy = requestedBy;
    await expense.save();
    res.status(StatusCodes.OK).json({
      status: "success",
      data: expense,
    });
  }
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

  const expense = await Expense.findById({ _id: id });

  if (expense.approval === true) {
    next(new AppError("you can not Delete Approved Expense"));
  }
  const deletedExpense = await Expense.findByIdAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({
    status: "success",
    data: deletedExpense,
  });
});

exports.deleteExpenseByAdmin = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deletedExpense = await Expense.findByIdAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({
    status: "success",
    data: deletedExpense,
  });
});
