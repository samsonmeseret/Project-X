const mongoose = require("mongoose");
const Patients = require("../model/patients");
const CatchAsync = require("../utils/CatchAsync");
const { StatusCodes } = require("http-status-codes");

exports.createPatients = CatchAsync(async (req, res, next) => {
  const newPatients = new Patients({
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    sex: req.body.sex,
    phone: req.body.phone,
    // disgnosisOnlyDR: req.body.disgnosisOnlyDR,
    cardFee: req.body.cardFee,
    procedureFee: req.body.procedureFee,
    appointmentDate: req.body.appointmentDate,
    eyeglassPayment: req.body.eyeglassPayment,
    // serviceProvided: req.body.serviceProvided,
    // serviceFee: req.body.serviceFee,
    // physician: req.body.physician,
  });

  const savedPatients = await newPatients.save();
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: { savedPatients },
  });
});

exports.getPatient = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const foundPatients = await Patients.findById({ _id: id });
  if (!foundPatients) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "success",
      data: `No Patient found with ID : ${id}`,
    });
  } else {
    res.status(StatusCodes.OK).json({
      status: "success",
      data: { foundPatients },
    });
  }
});

exports.getAllPatients = async (req, res) => {
  const { cardNumber, sex, sort, field } = req.query;
  let queryObject = {};
  //fiter by featured
  // if (featured) {
  //     queryObject.featured = featured === 'true'? true: false
  // }
  //filter by a sex
  if (sex) {
    queryObject.sex = sex;
  }
  //search by a cardNumber
  if (cardNumber) {
    queryObject.cardNumber = { $regex: cardNumber, $options: "i" };
  }
  let result = Patients.find(queryObject);
  //sort by alfabetical string(firstname ...) and nubers(age ...)
  if (sort) {
    const sortlist = sort.split(",").join(" ");
    result = result.sort(sortlist);
  } else {
    result = result.sort("createdAt");
  }
  //select the elements to apper from the filter
  if (field) {
    const fieldlist = field.split(",").join(" ");
    result = result.select(fieldlist);
  }
  //page number is an input from client and default 1
  //limit is how many items to apper on the single page
  //skip is also an input from the client it helps to skip items per the pages
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  console.log(queryObject);
  const data = await result;

  res
    .status(StatusCodes.OK)
    .json({ status: "success", data, nbHits: data.length });
};
exports.updatePatients = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedPatients = await Patients.findByIdAndUpdate(
    { _id: id },
    req.body,
    {
      new: true,
    }
  );
  if (!updatedPatients) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "success",
      message: `No Patient with ID : ${id}`,
    });
  } else {
    res.status(StatusCodes.OK).json({
      status: "success",
      data: { updatedPatients },
    });
  }
});
exports.deletePatients = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deletedPatients = await Patients.findByIdAndDelete(
    { _id: id },
    { new: true }
  );
  if (!deletedPatients) {
    res.status(StatusCodes.NOT_FOUND).json({
      status: "success",
      message: `No Patient with ID : ${id}`,
    });
  } else {
    res.status(StatusCodes.OK).json({
      status: "success",
      data: { deletedPatients },
    });
  }
});
