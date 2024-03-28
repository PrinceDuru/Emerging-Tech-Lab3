// Import resolvers for each operation
const { deleteVitalsign, updateVitalsign } = require('../resolvers/vitalsign.server.resolvers');

// Patient-vitalsign-schema.js
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
  } = require('graphql');
  
  // const PatientModel = require('../models/Patient.server.model'); // Import your Patient model
  const VitalsignModel = require('../model/vitalsign.server.model'); // Import your vitalsign model
  
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const JWT_SECRET = "some_secret_key"; // generate this elsewhere
  const jwtExpirySeconds = 300;
  
// Create a GraphQL Object Type for Patient model
// The fields object is a required property of a GraphQLObjectType 
// and it defines the different fields or query/mutations that are available
// in this type.

  
  // Create a GraphQL Object Type for vitalsign model
  const vitalsignType = new GraphQLObjectType({
    name: 'vitalsign',
    fields: function () {
      return {
        id: {
          type: GraphQLID // Unique identifier for the Patient (typically corresponds to MongoDB _id)
        },
        patientId: {
          type: GraphQLString,
        },
        bloodPressure: {
          type: GraphQLString,
        },
        heartRate: {
          type: GraphQLString,
        },
        temperature: {
          type: GraphQLString,
        },
        respRate: {
          type: GraphQLString,
        },
        patient: {
          type: GraphQLID,
        },
      };
    },
  });
  
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        // 
        vitalsigns: {
          type: new GraphQLList(vitalsignType),
          resolve: function () {
            const vitalsigns = VitalsignModel.find().exec()
            if (!vitalsigns) {
              throw new Error('Error')
            } 
            return vitalsigns;
          },
        },

        vitalsign: {
          type: vitalsignType,
          args: {
            id: {
              name: 'id',
              type: GraphQLString
            },
          },
          resolve: async function (root, params) {
            console.log('Executing vitalsign resolver with params:', params);
            try {
              const vitalsignInfo = await VitalsignModel.findById(params.id).exec();
              console.log('Vitalsign info:', vitalsignInfo);
  
              if (!vitalsignInfo) {
                console.error('Vitalsign not found for id:', params.id);
                throw new Error('Error');
              }
  
              return vitalsignInfo;
            } catch (error) {
              console.error('Error fetching vitalsign:', error);
              throw new Error('Failed to fetch vitalsign');
            }
          }
        },
        


      };
    },
  });

  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
       

        addVitalsign: {
          type: vitalsignType,
          args: {
            patientId: {
              type: new GraphQLNonNull(GraphQLString),
            },
            bloodPressure: {
              type: new GraphQLNonNull(GraphQLString),
            },
            heartRate: {
              type: new GraphQLNonNull(GraphQLString),
            },
            temperature: {
              type: new GraphQLNonNull(GraphQLString),
            },
            respRate: {
              type: new GraphQLNonNull(GraphQLString),
            },
          },
          resolve: async function (root, { patientId, bloodPressure, heartRate, temperature, respRate}, context) {
            // Check if the Patient is logged in
            const token = context.req.cookies.token;
        
            // if (!token) {
            //   console.log("Patient not authenticated");
            //   throw new Error('Patient not authenticated');
              
            // }
        
            try {
              // Verify the token to get the Patient ID
              // const decodedToken = jwt.verify(token, JWT_SECRET);
              // console.log('decodedToken:', decodedToken);
              // const patient = decodedToken._id;
              // console.log('patient:', patient)
        
              // Continue with adding the vitalsign, including the patient
              const vitalsignModel = new VitalsignModel({ patientId, bloodPressure, heartRate, temperature, respRate/*, patient*/});
              const savedvitalsign = await vitalsignModel.save();
        
              return savedvitalsign;
            } catch (error) {
              console.error('Error adding vitalsign:', error);
              throw new Error('Failed to add vitalsign');
            }
          },
        },

        deleteVitalsign: {
          type: vitalsignType,
          args: {
            vitalsignCode: { type: new GraphQLNonNull(GraphQLString)}
          },
          resolve: deleteVitalsign
          
        },

        updateVitalsign: {
          type: vitalsignType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString),
            },
            patientId: {
              type: new GraphQLNonNull(GraphQLString),
            },
            bloodPressure: {
              type: new GraphQLNonNull(GraphQLString),
            },
            heartRate: {
              type: new GraphQLNonNull(GraphQLString),
            },
            temperature: {
              type: new GraphQLNonNull(GraphQLString),
            },
            respRate: {
              type: new GraphQLNonNull(GraphQLString),
            },
          },
          resolve: updateVitalsign
          // resolve: async function (root, params, context) {
          //   const token = context.req.cookies.token;
          //   // if (!token) {
          //   //   return 'not-auth';
          //   // }
  
          //   try {
          //     // Get the Patient ID from the token
          //     const { _id: PatientId } = jwt.verify(token, JWT_SECRET);
              
          //     // Find the vitalsign by ID
          //     const vitalsign = await vitalsignModel.findById(params.id).exec();
  
          //     // Check if the Patient making the edit is the enrolledPatient for the vitalsign
          //     // if (!vitalsign || String(vitalsign.enrolledPatient) !== PatientId) {
          //     //   throw new Error('Unauthorized');
          //     // }
  
          //     // Update the vitalsign vitalsignCode
          //     const updatedvitalsign = await vitalsignModel.findByIdAndUpdate(
          //       params.id,
          //       { vitalsignCode: params.vitalsignCode },
          //       { new: true }
          //     ).exec();
  
          //     return updatedvitalsign;
          //   } catch (error) {
          //     console.error('Error editing vitalsign:', error);
          //     // Handle the error, e.g., show an error message to the Patient.
          //     throw new Error('Failed to edit vitalsign');
          //   }
          // },
        },
        
      };
    },
  });
  
  module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
  