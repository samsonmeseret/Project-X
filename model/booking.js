const mongoose = require("mongoose");
const validator = require("validator");

const bookingSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "please provide First Name"],
    minlength: 1,
  },
  middlename: {
    type: String,
    required: [true, "please provide Middle Name"],
    minlength: 1,
  },
  lastname: {
    type: String,
    required: [true, "please provide Last Name"],
    minlength: 1,
  },
  age: {
    type: Number,
    required: [true, "please provide Age"],
    minlength: 1,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "please provide a valid Email Address"],
    minlength: 1,
  },
  phone: {
    type: Number,
    required: [true, "please provide a Phone Number"],
  },
  Address: {
    type: String,
    required: [true, "please provide Address"],
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
