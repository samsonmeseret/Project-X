const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  expenseItem: {
    type: String,
    required: [true, "please provide requested Ites"],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: [true, "please provide requested price"],
  },
  requestedPerson: {
    type: String,
    required: [true, "please provide your fullname"],
  },
  approval: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
