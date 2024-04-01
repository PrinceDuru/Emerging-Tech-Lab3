import React from 'react';
import {gql, useQuery} from "@apollo/client";
//import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
//import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
//
// To parse the GraphQL operations, we use a special function
// called a tagged template literal to allow us to express them
// as JavaScript strings. This function is named gql
//
// note the backquotes here
const GET_PATIENTS = gql`
{
    patient{
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
const PatientList = () => {

    const { loading, error, data , refetch } = useQuery(GET_PATIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            
            <Table >
                <tbody>
                <tr>
                        <th>Patient No</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Phone Number</th>
                        <th>Program</th>
                        <th>Action</th>
                        <th>Action</th>

                </tr>
                {data.patients.map((patient, index) => (
                        <tr key={index}>
                            
                            <td>{patient.patientNo}</td>
                            <td>{patient.email}</td>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.address}</td>
                            <td>{patient.city}</td>
                            <td>{patient.phoneNumber}</td>
                            <td>
                                <Link to={`/editpatient/${patient.id}`}>Edit</Link>
                            </td>

                            <td>
                                <Link to={`/deletepatient/${patient.id}`}>Delete</Link>
                            </td>

                        </tr>
                ))}
             </tbody>
            </Table>
            
            <div className="center">
                <button className = "center" onClick={() => refetch()}>Refetch</button>
            </div>
            
        </div>
        
    );
}

export default PatientList

