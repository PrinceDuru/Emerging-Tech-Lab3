//vitalsign.server.model.js
// Load the module dependencies

const mongoose = require('mongoose');

// Define a new 'vitalsignSchema'
const vitalsignSchema = new mongoose.Schema({
    patientId: { 
        type: String,
        required: [true, "Please add patientId"], 
        unique: [true, "patientId is already in use"],
    },
    bloodPressure: {
        type: String,
        required: [true, "Please add bloodPressure"],
      },
      heartRate: {
        type: String,
        required: [true, "Please add heartRate"],
      },
    temperature: {
        type: String,
        required: [true, "Please add temperature"],
      },
      respRate: {
        type: String,
        required: [true, "Please add respRate"],
      },
    patient: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: false
      },
});
// Create the 'vitalsign' model out of the 'vitalsignSchema'
const VitalsignModel = mongoose.model('Vitalsign', vitalsignSchema);

// Export the 'vitalsign' model
module.exports = VitalsignModel;
