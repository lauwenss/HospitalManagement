const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admissionInformation = new Schema({
  admissionDate: {
    type: Date,
    default: new Date(),
  },

  dischargeDate: {
    type: Date,
    default: new Date(),
  },

  diagnosis: {
    type: String,
    required: [true, "diagnosis is required"],
  }
});

const Admission = mongoose.model("admissions", admissionInformation);
module.exports = Admission;