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
    },
    approval: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

expenseSchema.pre("save", function (next) {
  if (!this.isModified("quantity unitPrice")) return next();
  this.totalPrice = this.quantity * this.unitPrice;
  next();
});

module.exports = mongoose.model("Expense", expenseSchema);
