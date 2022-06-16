const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    expenseName: {
      type: String,
      required: [true, "please provide requested Ites"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    unitPrice: {
      type: Number,
      required: [true, "please provide requested price"],
    },
    requestedBy: {
      type: String,
      required: [true, "please provide your fullname"],
    },
    totalPrice: {
      type: Number,
      default: function () {
        return this.unitPrice * this.quantity;
      },
    },
    approval: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
