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
    patientController.deletePatient
  );

// By Medical Doctor/ Specialist / SubSpecialist
Router.route("/diag/patients").get(
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
Router.route("/admin/patients")
  .get(
    AuthController.restrictTo("admin"),
    patientController.getAllPatientsbyAdmin
  )
  .post(
    AuthController.restrictTo("admin"),
    patientController.createPatientsByAdmin
  );

Router.route("/admin/patients/:id")
  .get(AuthController.restrictTo("admin"), patientController.getPatientByAdmin)
  .patch(AuthController.restrictTo("admin"), patientController.updateByAdmin)
  .delete(AuthController.restrictTo("admin"), patientController.deletePatient);

module.exports = Router;
