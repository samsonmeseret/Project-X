const express = require("express");
const Router = express();
const AuthController = require("../controller/AuthController");
const patientController = require("../controller/patientsController");

Router.use(AuthController.protect);

Router.route("/patients").post(patientController.createPatients);

module.exports = patientRouter;
