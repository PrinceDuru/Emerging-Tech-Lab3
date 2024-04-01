import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// 
const GET_STUDENT = gql`
  query GetPatient($id: String!) {
    patient(id: $id) {
      patientNo
      email
      firstName
      lastName
      address
      city
      phoneNumber
    }
  }
`;
//
const UPDATE_PATIENT = gql`
  mutation UpdatePatient($id: String!, $patientNo: String!, $email: String!, $firstName: String!, $lastName: String!,
    $address: String!, $city: String!, $phoneNumber: String!) {
    updatePatient(id: $id, patientNo: $patientNo, email: $email, firstName: $firstName, lastName: $lastName,
      address: $address, city: $city, phoneNumber: $phoneNumber) {
        id
        patientNo
        email
        firstName
        lastName
        address
        city
        phoneNumber 
    }
  }
`;

//
function EditPatient(props)
{
    const [patient, setPatient] = useState({ id: '', patientNo: '', email: '', firstName: '',
    lastName: '', address: '', city: '', phoneNumber: ''});
    let navigate = useNavigate();
    const { id } = useParams(); // Get the id parameter from the URL
    console.log('in EditPatient, id=', id);
    //
    const { loading, error, data } = useQuery(GET_PATIENT, {
        variables: { id },
        onCompleted: (data) => {
          const {patientNo: patientNo, email: currentEmail, firstName: currentFirstName,
            lastName: currentLastName, address: currentAddress, city: currentCity, phoneNumber: currentPhoneNumber,
          } = data.patient;
          //
          setPatient({ id, patientNo: patientNo, email: currentEmail, firstName: currentFirstName,
            lastName: currentLastName, address: currentAddress, city: currentCity, phoneNumber: currentPhoneNumber,
          });
          
        },
      });
      // print error
      if (error) {  console.log('error=', error); }
      //print data
      if (data) { console.log('data=', data); }

      //
      const [updatePatient] = useMutation(UPDATE_PATIENT);

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      // 
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('in handleSubmit, patient=', patient);
        
        try {
          console.log('Before updatePatient call');
          await updatePatient({
            variables: { id, ...patient },
          });
          console.log('After updatePatient call', patient);
          navigate('/patientlist');
        } catch (error) {
          console.error('Error updating patient:', error);
          // Handle the error as needed (e.g., show an error message to the patient)
        }
      };
      
      //
      //
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPatient((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      //
      return (
        <div>
          <h1>Edit Patient</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPatientNo">
              <Form.Label>Patient No</Form.Label>
              <Form.Control
                type="text"
                name="patientNo"
                placeholder="Enter patient number"
                value={patient.patientNo || data.patient.patientNo}
                onChange={handleInputChange}
              />
            </Form.Group>
    
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter email"
                value={patient.email || data.patient.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={patient.firstName || data.patient.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={patient.lastName || data.patient.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={patient.address || data.patient.address}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter city"
                value={patient.city || data.patient.city}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={patient.phoneNumber || data.patient.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formProgram">
              <Form.Label>Program</Form.Label>
              <Form.Control
                type="text"
                name="program"
                placeholder="Enter program"
                value={patient.program || data.patient.program}
                onChange={handleInputChange}
              />
            </Form.Group>

    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );

}

export default EditStudent;