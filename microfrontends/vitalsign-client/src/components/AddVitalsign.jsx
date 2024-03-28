import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Form, Button } from 'react-bootstrap'; // Import React Bootstrap components

// AddCourse mutation
const ADD_VITALSIGN = gql`
  mutation AddVitalsign($patientId: String!, $bloodPressure: String!, $heartRate: String!, $temperature: String!, $respRate: String!) {
    addVitalsign(patientId: $patientId, bloodPressure: $bloodPressure, heartRate: $heartRate,  temperature: $temperature,  respRate: $respRate) {
        patientId
    }
  }
`;

// AddCourse component
const AddVitalsign = () => {
  const [patientId, setPatientId] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [respRate, setRespRate] = useState('');
  let navigate = useNavigate();
  const [addVitalsign] = useMutation(ADD_VITALSIGN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVitalsign({ variables: { patientId, bloodPressure, heartRate, temperature, respRate } });
      // Clear input fields
      setPatientId('');
      setBloodPressure('');
      setHeartRate('');
      setTemperature('');
      setRespRate('');
      navigate('/listvitalsigns');
    } catch (err) {
      console.error('Error creating vitalsign:', err);
      // Handle the error, e.g., show an error message to the student.
    }
  };

  // AddCourse component UI with React Bootstrap components
  return (
    <div>
      <h2>Create Vitalsign Record</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPatientId">
          <Form.Label>Patient Id:</Form.Label>
          <Form.Control type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBloodPressure">
          <Form.Label>Blood Pressure:</Form.Label>
          <Form.Control type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formHeartRate">
          <Form.Label>Heart Rate:</Form.Label>
          <Form.Control type="text" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formTemperaturer">
          <Form.Label>Temperature:</Form.Label>
          <Form.Control type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formRespRate">
          <Form.Label>Respiratory Rate:</Form.Label>
          <Form.Control type="text" value={respRate} onChange={(e) => setRespRate(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Vitalsign record
        </Button>
      </Form>
    </div>
  );
};

export default AddVitalsign;
