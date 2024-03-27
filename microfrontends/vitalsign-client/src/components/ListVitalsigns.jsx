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
const GET_VITALSIGNS = gql`
  query GetVitalsigns {
    vitalsigns {
      id
      patientId
      bloodPressure
      heartRate
      temperature
      respRate
    }
  }
`;

//
const ListVitalsigns = () => {

    const { loading, error, data , refetch } = useQuery(GET_VITALSIGNS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (

        <div>
            
            <Table >
                <tbody>
                <tr>
                        <th>Patient ID</th>
                        <th>Blood Pressure</th>
                        <th>Heart Rate</th>
                        <th>Temperature</th>
                        <th>Respiratory Rate</th>
                        <th>Action</th>
                        <th>Action</th>


                </tr>
                {data.vitalsigns.map((vitalsign, index) => (
                        <tr key={index}>
                            
                            <td>{vitalsign.patientId}</td>
                            <td>{vitalsign.bloodPressure}</td>
                            <td>{vitalsign.heartRate}</td>
                            <td>{vitalsign.temperature}</td>
                            <td>{vitalsign.respRate}</td>

                            <td>
                                <Link to={`/editvitalsign/${vitalsign.id}`}>Edit</Link>
                            </td>

                            <td>
                                <Link to={`/deletevitalsign/${vitalsign.id}`}>Delete</Link>
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

export default ListVitalsigns

