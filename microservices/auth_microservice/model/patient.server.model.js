// patient.server.model.js
// Load bcrypt module, used to hash the passwords
const bcrypt = require('bcrypt')
// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define a new 'StudentSchema'
const patientSchema = new Schema({
    patientNo: {
		type: String,
		required: [true, "Please add a patient number"],
		unique: [true, "Patient number must be unique"],
	  },
	  email: {
		type: String,
		required: [true, "Please add an email"],
		unique: [true, "Email must be unique"],
	  },
	  password: {
		type: String,
		required: [true, "Please add a password"],
	  },
	  firstName: {
		type: String,
		required: [true, "Please add a first name"],
	  },
	  lastName: {
		type: String,
		required: [true, "Please add a last name"],
	  },
	  address: {
		type: String,
		required: [true, "Please add an address"],
	  },
	  city: {
		type: String,
		required: [true, "Please add an city"],
	  },
	  phoneNumber: {
		type: String,
		required: [true, "Please add a phone number"],
	  },
});
// hash the passwords before saving
patientSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password.trim(), salt);
    this.password = hashedPassword;
})
//
// Create the 'Student' model out of the 'studentSchema'
module.exports = mongoose.model('Patient', patientSchema);