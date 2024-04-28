require("dotenv").config();
const express = require("express");
const app = express();
const portNumber = 4000;
const mongoose = require("mongoose");

app.use(express.json());

// db
console.log(process.env.MONGO_URI);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => console.log("connected to MongoDB"));

//routes
const admissionRoute = require("./routes/admissionRoute");
app.use("/api/v1/admissions", admissionRoute);

const doctorRoute = require("./routes/doctorRoute");
app.use("/api/v1/doctors", doctorRoute);

const patientRoute = require("./routes/patientRoute");
app.use("/api/v1/patients", patientRoute);


app.listen(portNumber, () => {
    console.log(`server is running on http://localhost:${portNumber}`);
  });