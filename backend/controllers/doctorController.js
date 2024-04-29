const Doctor = require("../models/doctorSchema");
const mongoose = require("mongoose");

module.exports.doctors = (req, res) => {
    Doctor.find({ active: true })
      .then((doctors) => res.send(doctors))
      .catch((error) => res.send(error));
  };
  
  module.exports.doctor = (req, res) => {
    const doctorID = req.params.id;
  
    Doctor.findById(doctorID)
      .then((doctors) => res.send(doctors))
      .catch((error) => res.send(error));
  };

  module.exports.getDoctorByName = (req, res) => {
    const doctorName = req.query.name;
  
    if (!doctorName) {
      return res.status(400).json({ error: "Doctor Name Parameter is Required" });
    }
    
    Doctor.findOne({ $or: [{ lastName: doctorName }, {firstName: doctorName }] })
      .then((doctor) => {
        if (!doctor) {
          return res.status(404).json({ error: "Doctor Not Found" });
        }
        res.status(200).json(doctor);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message || "Internal Server Error" });
      });
  };
  
  module.exports.createDoctor = (req, res) => {
    const { lastName, firstName, speciality, active } = req.body;
  
    const newDoctor = new Doctor({
      lastName,
      firstName,
      speciality,
      active,
    });
  
    try {
      const savedDoctor = newDoctor.save();
      res.status(201).json({ "New Patient": newDoctor });
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  };
  
  module.exports.deleteDoctor = (req, res) => {
      const doctorID = req.params.doctorID;
      console.log(doctorID);
    
      Doctor.findByIdAndDelete(doctorID)
        .then(doctor => {
          if (!doctor) {
            return res.status(404).send({ message: 'Doctor not found' });
          }
          res.send({ message: 'Doctor deleted successfully', doctor });
        })
        .catch(error => res.status(500).send(error));
    };
    
  
  module.exports.updateDoctor = (req, res) => {
    const { lastName, firstName, speciality, active } = req.body;
    console.log(req.body);
  
    const doctorID = req.params.id;
    console.log(doctorID);
  
    const updatedFields = { lastName, firstName, speciality, active };
    console.log(updatedFields);
  
    Doctor.findByIdAndUpdate(doctorID, updatedFields, { new: true })
      .then((updatedDoctor) => {
        if (!updatedDoctor) {
          return res.status(404).json({ error: "Patient Not Found" });
        }
  
        res.status(200).json(updatedDoctor);
      })
  
      .catch((error) => {
        res.status(500).json({ error: error.message || "Internal Server Error" });
      });
  };
 