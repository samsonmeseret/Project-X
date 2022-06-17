const express = require("express");
const Router = express();
const AuthController = require("../controller/AuthController");
const patientController = require("../controller/patientsController");

// Protecting every resources of patient
Router.use(AuthController.protect);

// By Reception/Receptionist
Router.route("/patients")
  .post(
    AuthController.restrictTo("reception"),
    patientController.createPatients
  )
  .get(
    AuthController.restrictTo("reception"),
    patientController.getAllPatientsbyReception
  );
Router.route("/patients/:id")
  .patch(
    AuthController.restrictTo("reception"),
    patientController.updatePatientsByReception
  )
  .get(
    AuthController.restrictTo("reception"),
    patientController.getPatientByReception
  )
  .delete(
    AuthController.restrictTo("reception"),
    patientController.deletePatients
  );

// By Medical Doctor/ Specialist / SubSpecialist
Router.route("/patients/diag").get(
  AuthController.restrictTo("doctor"),
  patientController.findAllPatientDiag
);
Router.route("/patients/diag/:id")
  .get(AuthController.restrictTo("doctor"), patientController.getPatientDiag)
  .patch(
    AuthController.restrictTo("doctor"),
    patientController.createDiagnosis
  );

//By Admin
Router.route("/admin/");
module.exports = patientRouter;
