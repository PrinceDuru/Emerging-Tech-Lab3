import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
// Import components
import Home from './components/Home';
// import AddStudent from './components/AddStudent';
// import LoginStudent from './components/LoginStudent';
import AddVitalsign from './components/AddVitalsign';
// import EditStudent from './components/EditStudent';
// import EditCourse from './components/EditCourse';
// import DeleteStudent from './components/DeleteStudent';
// import DeleteCourse from './components/DeleteCourse';
import ListVitalsigns from './components/ListVitalsigns';
// import CoursesHome from './components/CoursesHome';
// import StudentList from './components/StudentList';
// App component
function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            React Client For GraphQL API
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/createpatient">
                Create Patient
              </Nav.Link>
              <Nav.Link as={Link} to="/patientlist">
              Patient List
              </Nav.Link>
              <Nav.Link as={Link} to="/addvitalsign">
                Add Vitalsign
              </Nav.Link>
              <Nav.Link as={Link} to="/listvitalsigns">
                List Vitalsigns
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/deletecourse">
                Delete Course
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          {/* <Route path="login" element={<LoginStudent />} />
          <Route path="studentlist" element={<StudentList />} />
          <Route path="createstudent" element={<AddStudent />} />
          <Route path = "editstudent/:id" element={<EditStudent />} />
          <Route path = "editcourse/:id" element={<EditCourse />} />
          <Route path = "deletestudent/:id" element={<DeleteStudent />} /> */}
          <Route path="addvitalsign" element={<AddVitalsign />} /> 
          <Route path="listvitalsigns" element={<ListVitalsigns />} />
          {/* <Route path="courseshome" element={<CoursesHome/>} />
          <Route path="deletecourse/:id" element={<DeleteCourse />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
//
export default App;
