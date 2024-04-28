const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");

router.get("/", patientController.patients);
router.get("/:id", patientController.patient);

//create
router.post("/create", patientController.createPatient);
router.delete("/delete/:patientID", patientController.deletePatient);
router.put("/update/:id", patientController.updatePatient);

module.exports = router;