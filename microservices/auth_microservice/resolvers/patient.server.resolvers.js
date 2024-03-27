const Patient = require('../model/patient.server.model');

  // Patient resolvers
  const updatePatient = async (parent, args) => {
    console.log('args in update Patient:', args);
    try {
      const { id, ...update } = args;
      const options = { new: true };
      let patient = await Patient.findByIdAndUpdate(id, update, options);

      if (!patient) {
        throw new Error(`Student with ID ${id} not found`);
      }

      // Explicitly call save to trigger the pre-save hook
      patient = await patient.save();

      return patient;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw new Error('Failed to update patient');
    }
  };

  

  const deletePatient = async (root, params) => {
    try {
      const deletePatient = await Patient.findOneAndDelete({ patientNo: params.patientNo }).exec();
  
      if (!deletePatient) {
        throw new Error(`Patient with patientNo ${params.patientNo} not found`);
      }
  
      return deletePatient;
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw new Error('Failed to delete patient');
    }
  };


 

  // Export resolvers
  module.exports = {
  
    updatePatient,
    deletePatient,
  }