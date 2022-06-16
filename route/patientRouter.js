const express = require("express");
const Router = express();
const AuthController = require("../controller/AuthController");
const patientController = require("../controller/patientsController");

Router.use(AuthController.protect);

Router.route("/patients")
  .post(patientController.createPatients)
  .get(patientController.getAllPatients);
Router.route("/patients/:id")
  .patch(patientController.updatePatients)
  .get(patientController.getPatient)
  .delete(patientController.deletePatients);
Router.route("/patients/diag").get();
Router.route("/patients/diag/:id").patch(patientController.createDiagnosis);
module.exports = patientRouter;
