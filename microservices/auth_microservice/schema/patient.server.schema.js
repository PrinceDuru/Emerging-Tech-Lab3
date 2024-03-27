// Import resolvers for each operation
const { updatePatient, deletePatient } = require('../resolvers/patient.server.resolvers');

// patient-schema.js
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
  } = require('graphql');
  
  const PatientModel = require('../model/patient.server.model'); // Import your Student model
//   const CourseModel = require('../models/course.server.model'); // Import your Course model
  
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const JWT_SECRET = "some_secret_key"; // generate this elsewhere
  const jwtExpirySeconds = 300;
  
// Create a GraphQL Object Type for Student model
// The fields object is a required property of a GraphQLObjectType 
// and it defines the different fields or query/mutations that are available
// in this type.
  const patientType = new GraphQLObjectType({
    name: 'patient',
    fields: function () {
      return {
        id: {
          type: GraphQLID // Unique identifier for the patient (typically corresponds to MongoDB _id)
        },
        patientNo: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
        firstName: {
          type: GraphQLString,
        },
        lastName: {
        type: GraphQLString,
        },
        address: {
        type:GraphQLString,  
        },
        city: {
        type: GraphQLString,  
        },
        phoneNumber: {
        type: GraphQLString,  
        },          
      }  
    },
  });
  
  
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        patients: {
          type: new GraphQLList(patientType),

          resolve: function () {
            const patients = PatientModel.find().exec()
            if (!patients) {
              throw new Error('Error')
            }
            return patients
          }
        },
        patient: {
          type: patientType,
          args: {
            id: {
              name: 'id',
              type: GraphQLString
            }
          },
          resolve: async function (root, params) {
            console.log('Executing student resolver with params:', params);
            try {
              const patientInfo = await PatientModel.findById(params.id).exec();
              console.log('Patient info:', patientInfo);
  
              if (!patientInfo) {
                console.error('Patient not found for id:', params.id);
                throw new Error('Error');
              }
  
              return patientInfo;
            } catch (error) {
              console.error('Error fetching patient:', error);
              throw new Error('Failed to fetch patient');
            }
          }
        },
        // check if patient is logged in
        isLoggedIn: {
          type: GraphQLBoolean,  // Change the type to Boolean
          args: {
            email: {
              name: 'email',
              type: GraphQLString,
            },
          },
          resolve: function (root, params, context) {
            const token = context.req.cookies.token;
  
            // If the cookie is not set, return false
            if (!token) {
              return false;
            }
  
            try {
              // Try to verify the token
              jwt.verify(token, JWT_SECRET);
              return true;  // Token is valid, student is logged in
            } catch (e) {
              // If verification fails, return false
              return false;
            }
          },
        },
        
      };
    },
  });
  
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        createPatient: {
          type: patientType,
          args: {
            patientNo: {
              type: new GraphQLNonNull(GraphQLString),
            },
            email: {
              type: new GraphQLNonNull(GraphQLString),
            },
            password: {
              type: new GraphQLNonNull(GraphQLString),
            },
            firstName: {
              type: new GraphQLNonNull(GraphQLString),
            },
            lastName: {
              type: new GraphQLNonNull(GraphQLString),
            },
            address: {
              type: new GraphQLNonNull(GraphQLString),
            },
            city: {
              type: new GraphQLNonNull(GraphQLString),
            },
            phoneNumber: {
              type: new GraphQLNonNull(GraphQLString),
            },
          },
          resolve: function (root, params, context) {
            const patientModel = new PatientModel(params);
            const newPatient = patientModel.save();
            if (!newPatient) {
              throw new Error('Error');
            }
            return newPatient
          }
        },

        updatePatient: {
          type: patientType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            patientNo: {
              type: new GraphQLNonNull(GraphQLString),
            },
            email: {
              type: new GraphQLNonNull(GraphQLString),
            },
            firstName: {
              type: new GraphQLNonNull(GraphQLString),
            },
            lastName: {
              type: new GraphQLNonNull(GraphQLString),
            },
            address: {
              type: new GraphQLNonNull(GraphQLString),
            },
            city: {
              type: new GraphQLNonNull(GraphQLString),
            },
            phoneNumber: {
              type: new GraphQLNonNull(GraphQLString),
            },                       
          },
          resolve: updatePatient
        },

        deletePatient: {
          type: patientType,
          args: {
            patientNo: { type: new GraphQLNonNull(GraphQLString)}
          },
          resolve: deletePatient
          
        },

        loginPatient: {
          type: GraphQLBoolean,  // Change the type to Boolean
          args: {
            email: {
              name: 'email',
              type: GraphQLString,
            },
            password: {
              name: 'password',
              type: GraphQLString,
            },
          },
          resolve: async function (root, params, context) {
            console.log('Executing loginPatient resolver with params:', params);

            const patientInfo = await PatientModel.findOne({ email: params.email }).exec();
            console.log('Student info:', patientInfo);
            if (!patientInfo) {
              console.error('Patient not found for email:', params.email);
              return false;  // Authentication failed
            }
            console.log('email: ', patientInfo.email)
            console.log('entered pass: ',params.password)
            console.log('hash: ', patientInfo.password)
             // check if the password is correct
            const isValidPassword = await bcrypt.compare(params.password.trim(), patientInfo.password);
            console.log('bcrypt.compare Result: ', isValidPassword);

            if (!isValidPassword) {
              console.error('Invalid password');
              console.log('Entered Password:', params.password);
              console.log('Stored Password:', patientInfo.password);
              return false;  // Authentication failed
            }
  
            try {
              const token = jwt.sign(
                { _id: patientInfo._id, email: patientInfo.email },
                JWT_SECRET,
                { algorithm: 'HS256', expiresIn: jwtExpirySeconds }
              );
            
              console.log('Generated token:', token);
            
              context.res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });
              return true;  // Authentication successful
            } catch (error) {
              console.error('Error generating token:', error);
              return false; // Authentication failed
            }
          },
        },

        logOut: {
            type: GraphQLString,
            resolve: (parent, args, context) => {
              context.res.clearCookie('token');
              return 'Logged out successfully!';
            },
        },
        
      };
    },
  });
  
  module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
  