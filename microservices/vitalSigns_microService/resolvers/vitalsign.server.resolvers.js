// const Student = require('../models/student.server.model');
const Vitalsign = require('../model/vitalsign.server.model');

  // // Student resolvers
  // const updateStudent = async (parent, args) => {
  //   console.log('args in update student:', args);
  //   try {
  //     const { id, ...update } = args;
  //     const options = { new: true };
  //     let student = await Student.findByIdAndUpdate(id, update, options);

  //     if (!student) {
  //       throw new Error(`Student with ID ${id} not found`);
  //     }

  //     // Explicitly call save to trigger the pre-save hook
  //     student = await student.save();

  //     return student;
  //   } catch (error) {
  //     console.error('Error updating student:', error);
  //     throw new Error('Failed to update student');
  //   }
  // };

  const updateVitalsign = async (parent, args) => {
    console.log('args in update Vitalsign:', args);
    try {
      const { id, ...update } = args;
      const options = { new: true };
      let vitalsign = await Vitalsign.findByIdAndUpdate(id, update, options);

      if (!vitalsign) {
        throw new Error(`Vitalsign with ID ${id} not found`);
      }

      // Explicitly call save to trigger the pre-save hook
      vitalsign = await vitalsign.save();

      return vitalsign;
    } catch (error) {
      console.error('Error updating vitalsign:', error);
      throw new Error('Failed to update vitalsign');
    }
  };

  // const deleteStudent = async (root, params) => {
  //   try {
  //     const deletedStudent = await Student.findOneAndDelete({ studentNo: params.studentNo }).exec();
  
  //     if (!deletedStudent) {
  //       throw new Error(`Student with studentNo ${params.studentNo} not found`);
  //     }
  
  //     return deletedStudent;
  //   } catch (error) {
  //     console.error('Error deleting student:', error);
  //     throw new Error('Failed to delete student');
  //   }
  // };


  const deleteVitalsign = async (root, params) => {
    try {
      const deletedVitalsign = await Vitalsign.findOneAndDelete({ vitalsignCode: params.vitalsignCode }).exec();
  
      if (!deletedVitalsign) {
        throw new Error(`Vitalsign with vitalsignCode ${params.vitalsignCode} not found`);
      }
  
      return deletedVitalsign;
    } catch (error) {
      console.error('Error deleting vitalsign:', error);
      throw new Error('Failed to delete vitalsign');
    }
  };

  // Export resolvers
  module.exports = {
  
    // updatePatient,
    // deletePatient,
    deleteVitalsign,
    updateVitalsign
  }