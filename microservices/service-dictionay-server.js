const express = require('express');
const app = express();
const port = 4005;

const serviceDictionary = {
  services: [
    {
      name: 'Vitalsign Microservice',
      endpoints: [
        {
          name: 'GetVitalsign',
          url: 'http://localhost:4001/graphql',
        //   method: 'GET',
        },
      ],
    },
    {
      name: 'User Authentication Microservice',
      endpoints: [
        {
          name: 'Login',
          url: 'http://localhost:4000/graphql',
        //   method: 'POST',
        },
      ],
    },
  ],
};

app.get('/service-dictionary', (req, res) => {
  res.json(serviceDictionary);
});

app.listen(port, () => {
  console.log(`Service Dictionary listening on port ${port}`);
});
