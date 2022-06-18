const express = require("express");
const Router = express();
const AuthController = require("../controller/AuthController");
const patientController = require("../controller/patientsController");

// Protecting every resources of patient
Router.use(AuthController.protect);

// By Reception/Admin/Doctor depends on the permission of the user Query result varies
Router.route("/patients")
  .post(patientController.registerPatients)
  .get(patientController.getAllPatients);
Router.route("/patients/:id")
  .patch(patientController.updatePatient)
  .get(patientController.getSinglePatient)
  .delete(patientController.deletePatient);

Router.route("/patients/stat/:year").get(
  patientController.getMonthlyPatientsStat
);
module.exports = Router;
