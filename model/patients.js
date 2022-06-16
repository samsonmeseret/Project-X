const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: Number,
      required: [true, "please provide a Card ID"],
      unique: [true, "the Card ID is allready in the System"],
      minlength: 1,
    },
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
    sex: {
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not supported",
      },
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
    diagnosis: {
      type: String,
    },
    cardFee: {
      type: Number,
    },
    procedureType: {
      type: Array,
    },
    procedureFee: {
      type: Number,
    },
    appointmentDate: {
      type: Date,
    },
    drAppointmentDate: {
      type: Date,
    },
    eyeglassType: {
      type: Array,
    },
    eyeglassPayment: {
      type: Number,
    },
    physicianName: {
      type: String,
    },
    totalPaid: {
      type: Number,
      default: function (total) {
        total = this.cardFee + this.procedureFee + this.eyeglassPayment;
        return total;
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patients", patientSchema);
