const express = require('express');
const app = express();
const port = 4005;

// Load the module dependencies
const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/vitalsign.server.schema');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "some_secret_key"; // your secret key
const jwtExpirySeconds = 300;

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


const serviceDictionary = {
  services: [
    {
      name: 'Vitalsign Microservice',
      endpoints: [
        {
          name: 'GetVitalsign',
          url: 'http://localhost:4001/graphql',
          method: 'GET',
        },
      ],
    },
    {
      name: 'User Authentication Microservice',
      endpoints: [
        {
          name: 'Login',
          url: 'http://localhost:4000/graphql',
          method: 'POST',
        },
      ],
    },
  ],
};


// Configure CORS options
const corsOptions = {
  origin: ["http://localhost:3000"]
//   credentials: true,
};
app.use(cors(corsOptions));

// Add a middleware for checking JWT and making student info available in the context
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.vitalsign = payload;
    } catch (e) {
      // Token is invalid
    }
  }
  next();
});


// app.get('/service-dictionary', (req, res) => {
//   res.json(serviceDictionary);
// });



// Configure GraphQL endpoint
app.use(
  '/service-dictionary',
  graphqlHTTP((request, response) => {
    return {
      schema: schema,
      rootValue: global,
      graphiql: true,
      context: {
        req: request,
        res: response,
        
      },
    };
  })
);


app.listen(port, () => {
  console.log(`Service Dictionary listening on port ${port}`);
});
