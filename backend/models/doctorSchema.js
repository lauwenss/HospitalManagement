const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorInformation = new Schema({
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },

  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },

  speciality: {
    type: String,
    required: [true, "Speciality is required"]
  },

  active: {
    type: Boolean,
    default: true,
  },
});

const Doctor = mongoose.model("doctors", doctorInformation);
module.exports = Doctor;