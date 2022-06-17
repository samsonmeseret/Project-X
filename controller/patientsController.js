const mongoose = require("mongoose");
const Patients = require("../model/patients");
const CatchAsync = require("../utils/CatchAsync");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError");

const filterObj = (obj, ...allowedFilds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFilds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createPatients = CatchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "cardNumber",
    "firstname",
    "middlename",
    "lastname",
    "age",
    "email",
    "sex",
    "phone",
    "Address",
    "cardFee",
    "procedureFee",
    "appointmentDate",
    "eyeglassPayment",
    "eyeglassType"
  );
  const newPatients = new Patients(filteredBody);

  const savedPatients = await newPatients.save();
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: { savedPatients },
  });
});

exports.createPatientsByAdmin = CatchAsync(async (req, res, next) => {
  const newPatients = new Patients(req.body);
  const patient = await newPatients.save();

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: patient,
  });
});

exports.getPatientByAdmin = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const patient = await Patients.findById({ _id: id });
  if (!patient)
    return next(
      new AppError(`No Patient with ID : ${id} or Removed`),
      StatusCodes.NOT_FOUND
    );

  res.status(StatusCodes.OK).json({
    status: "success",
    data: patient,
  });
});

exports.updateByAdmin = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const {
    cardNumber,
    firstname,
    middlename,
    lastname,
    age,
    email,
    sex,
    phone,
    Address,
    cardFee,
    procedureFee,
    appointmentDate,
    eyeglassPayment,
    eyeglassType,
    diagnosis,
    physicianName,
    drAppointmentDate,
  } = req.body;

  const patient = await Patients.findById({ _id: id });

  if (!patient)
    return next(
      new AppError(`No patient with ID ${id} or Removed`, StatusCodes.NOT_FOUND)
    );
  if (cardNumber) patient.cardNumber = cardNumber;
  if (firstname) patient.firstname = firstname;
  if (lastname) patient.lastname = lastname;
  if (email) patient.email = email;
  if (sex) patient.sex = sex;
  if (phone) patient.phone = phone;
  if (Address) patient.Address = Address;
  if (cardFee) patient.cardFee = cardFee;
  if (procedureFee) patient.procedureFee = procedureFee;
  if (age) patient.age = age;
  if (middlename) patient.middlename = middlename;
  if (appointmentDate) patient.appointmentDate = appointmentDate;
  if (eyeglassPayment) patient.eyeglassPayment = eyeglassPayment;
  if (eyeglassType) patient.eyeglassType = eyeglassType;
  if (diagnosis) patient.diagnosis = diagnosis;
  if (physicianName) patient.physicianName = physicianName;
  if (drAppointmentDate) patient.drAppointmentDate = drAppointmentDate;
  await patient.save({ runValidators: false });

  res.status(StatusCodes.OK).json({
    status: "success",
    data: patient,
  });
});

exports.createDiagnosis = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { diagnosis, procedureType, physicianName, drAppointmentDate } =
    req.body;

  const patient = await Patients.findById({ _id: id });
  if (diagnosis) patient.diagnosis = diagnosis;
  if (drAppointmentDate) patient.drAppointmentDate = drAppointmentDate;
  if (physicianName) patient.physicianName = physicianName;
  if (procedureType) patient.procedureType = procedureType;

  await patient.save({ runValidators: false });
  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: patient,
  });
});

exports.getPatientDiag = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const patient = await Patients.findById({ _id: id }).select(
    "-appointmentDate -cardFee -procedureFee -eyeglassType -eyeglassPayment -totalPaid"
  );

  if (!patient)
    return next(
      new AppError(
        `No Patient with ID: ${id} or Removed `,
        StatusCodes.NOT_FOUND
      )
    );

  res.status(StatusCodes.OK).json({
    status: "success",
    data: patient,
  });
});

exports.findAllPatientDiag = CatchAsync(async (req, res, next) => {
  const { cardNumber } = req.query;

  let queryObject = {};

  //search by a cardNumber
  if (cardNumber) {
    queryObject.cardNumber = cardNumber;
  }

  let result = Patients.find(queryObject);

  const foundAllPatientsDiag = await result.select(
    "-appointmentDate -cardFee -procedureFee -eyeglassType -eyeglassPayment -totalPaid"
  );

  if (!foundAllPatientsDiag)
    return next(new AppError("No Patients Present", StatusCodes.NOT_FOUND));

  res.status(StatusCodes.OK).json({
    status: "success",
    data: foundAllPatientsDiag,
  });
});

exports.getPatientByReception = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const foundPatients = await Patients.findById({ _id: id }).select(
    "-physicianName -diagnosis"
  );
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

exports.getAllPatientsbyAdmin = async (req, res) => {
  const { cardNumber, sex, sort, field } = req.query;
  let queryObject = {};
  //filter by a sex
  if (sex) {
    queryObject.sex = sex;
  }
  //search by a cardNumber
  if (cardNumber) {
    queryObject.cardNumber = cardNumber;
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

exports.getAllPatientsbyReception = async (req, res) => {
  const { cardNumber, sex, sort, field } = req.query;
  let queryObject = {};
  //filter by a sex
  if (sex) {
    queryObject.sex = sex;
  }
  //search by a cardNumber
  if (cardNumber) {
    queryObject.cardNumber = cardNumber;
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
  const data = await result.select("-physicianName -diagnosis");

  res
    .status(StatusCodes.OK)
    .json({ status: "success", data, nbHits: data.length });
};

exports.updatePatientsByReception = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const filteredBody = filterObj(
    req.body,
    "card No",
    "firstname",
    "middlename",
    "lastname",
    "age",
    "email",
    "sex",
    "phone",
    "cardFee",
    "procedureFee",
    "appointmentDate",
    "eyeglassPayment",
    "eyeglassType"
  );
  const updatedPatients = await Patients.findByIdAndUpdate(
    { _id: id },
    filteredBody,
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

exports.deletePatient = CatchAsync(async (req, res, next) => {
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
