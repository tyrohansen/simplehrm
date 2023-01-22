import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { fetchEmployeeById } from '../../services/employee-service';
import { fetchEmployeeLeaveRequests } from '../../services/leave-service';
import LeaveForm from './LeaveForm';


function EmployeeDetailsPage() {
  const {id} = useParams();
  const [employee, setEmployee] = useState({});
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showLeaveRequestForm, setShowLeaveRequestForm] = useState(false);

  useEffect(() => {
    getEmployeeDetails(id);
    getEmployeeLeaveRequests(id);
    getEmployeeLeaveRequests(id);
  },[id]);

  const getEmployeeDetails = async (id) => {
     await fetchEmployeeById(id).then(response => {
        setEmployee(response.data)
      }).catch(error => {
       
     })
  }

  const getEmployeeLeaveRequests = async (id) => {
      await fetchEmployeeLeaveRequests(id).then(response => {
        setLeaveRequests(response.data);
      }).catch(error => {
        alert("An error Occurred!")
      })
  }
  return (
    <div><h3> Employee Profile</h3>
        {employee && <Row>
          <Col md={2}>
            Photo goes here
          </Col>
          <Col md={10}>
            <Row className='gy-5'>
              <Col md={8} className="offset-md-4 text-center">
                <Button>Edit</Button>&nbsp;&nbsp;
                <Button variant='success' onClick={() => setShowLeaveRequestForm(true)}>New Leave Request</Button>&nbsp;&nbsp;
                <Button variant='success'>New Document</Button>&nbsp;&nbsp;
                <Button variant='danger'>Delete</Button>&nbsp;&nbsp;
              </Col>
              <Col md={12}>
              <Card>
              <Card.Body>
              
              <Row>
                <Col md={4}>
                  <Table>
                      <tbody>
                        <tr>
                        <th>First Name</th>
                        <td>{employee.first_name}</td>
                        </tr>
                        <tr>
                        <th>Last Name</th>
                        <td>{employee.last_name}</td>
                        </tr>
                        <tr>
                        <th>Date of Birth</th>
                        <td>{employee.date_of_birth}</td>
                        </tr>
                        <tr>
                        <th>Gender</th>
                        <td>{employee.date_of_birth}</td>
                        </tr>
                      </tbody>
                  </Table>
                </Col>
                <Col md={4}>
                <Table>
                      <tbody>
                        <tr>
                        <th>Job Title</th>
                        <td>{employee.job_title}</td>
                        </tr>
                        <tr>
                        <th>Department</th>
                        <td>{employee.department_id}</td>
                        </tr>
                        <tr>
                        <th>Section</th>
                        <td>{employee.section}</td>
                        </tr>
                        <tr>
                        <th>Company ID No.</th>
                        <td>{employee.id_no}</td>
                        </tr>
                        <tr>
                        <th>Identification No.</th>
                        <td>{employee.nin}</td>
                        </tr>
                        <tr>
                        <th>Date Joined.</th>
                        <td>{employee.date_joined}</td>
                        </tr>
                      </tbody>
                  </Table>
                </Col>
                <Col md={4}>
                <Table>
                      <tbody>
                        <tr>
                        <th>Place of Origin</th>
                        <td>{employee.birth_place}</td>
                        </tr>
                        <tr>
                        <th>Residence</th>
                        <td>{employee.residence}</td>
                        </tr>
                        <tr>
                        <th>Next of Kin Name</th>
                        <td>{employee.kin_name}</td>
                        </tr>
                        <tr>
                        <th>Next of Kin Contact</th>
                        <td>{employee.kin_contact}</td>
                        </tr>
                        <tr>
                        <th>Emergency contact</th>
                        <td>{employee.emergency_contact}</td>
                        </tr>
                      </tbody>
                  </Table>
                </Col>
              </Row>
              </Card.Body>

            </Card>
              </Col>
              <Col md={12} className="mt-4">
              <Card>
              <Card.Body>
                    <Tabs
                    defaultActiveKey="leave"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
            <Tab eventKey="leave" title="Leave Requests">
               <h4> Leave Requests</h4>
               <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Days</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests && leaveRequests.map((item, i) => (
                    <tr key={`leave-${i}`}>
                    <td>{i + 1}</td>
                    <td>{item.start_date.substring(0, 10)}</td>
                    <td>{item.end_date.substring(0, 10)}</td>
                    <td>{item.work_days}</td>
                    <td>{item.reason}</td>
                    <td>{item.status}</td>
                  </tr>
                  ))}
                  
                </tbody>
               </Table>
            </Tab>
            <Tab eventKey="documents" title="Documents">
              No Documents Uploaded
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
              Contact
            </Tab>
          </Tabs>
              </Card.Body>
            </Card>
              </Col>
            </Row>
          </Col>
        
        </Row>}
        {showLeaveRequestForm && <LeaveForm employee={id} show={showLeaveRequestForm} onHide={() => setShowLeaveRequestForm(false)} />}
    </div>
  )
}

export default EmployeeDetailsPage