import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { fetchEmployeeById } from '../../services/employee-service';
import {getBaseUrl, url} from "../../services/axiosApi";
import { fetchEmployeeLeaveRequests } from '../../services/leave-service';
import LeaveForm from './LeaveForm';
import PhotoForm from './PhotoForm';
import EmployeeEditForm from './EmployeeEditForm';


function EmployeeDetailsPage() {
  const {id} = useParams();
  const [employee, setEmployee] = useState({});
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showLeaveRequestForm, setShowLeaveRequestForm] = useState(false);
  const [showPhotoEditForm, setShowPhotoEditForm] = useState(false);
  const [showEmployeeEditForm, setShowEmployeeEditForm] = useState(false);

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

  const onPhotoChangeSuccess = () => {
    setShowPhotoEditForm(false);
    getEmployeeDetails(id);
  }

  const onEmployeeEditSuccess = () => {
    getEmployeeDetails(id);
    setShowEmployeeEditForm(false);

  }
  return (
    <div><h3> Staff Profile</h3>
        {employee && <Row>
          <Col md={3}>
          <Card>
				{employee.photo && <Image
											fluid
											src={url + `photos/` + employee.photo}
										></Image>}
					<Card.Body>
						<Button onClick={()=>setShowPhotoEditForm(true)}>
							 Change Photo
						</Button>
						{showPhotoEditForm && <PhotoForm employee={employee.ID}   show={showPhotoEditForm} onHide={()=>setShowPhotoEditForm(false)} onSuccess={onPhotoChangeSuccess} />}
						
					</Card.Body>
				</Card>
          </Col>
          <Col md={9}>
            <Row className='gy-5'>
              <Col md={8} className="offset-md-4 text-center">
                <Button onClick={() => setShowEmployeeEditForm(true)}>Edit</Button>&nbsp;&nbsp;
                <Button variant='success' onClick={() => setShowLeaveRequestForm(true)}>New Leave Request</Button>&nbsp;&nbsp;
                <Button variant='success'>New Document</Button>&nbsp;&nbsp;
                <Button variant='danger'>Delete</Button>&nbsp;&nbsp;
              </Col>
              <Col md={12}>
              <Card>
              <Card.Body>
              
              <Row>
                <Col md={6}>
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
                <Col md={6}>
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
                <Col md={6}>
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
        {showEmployeeEditForm && <EmployeeEditForm employeeId={id} show={showEmployeeEditForm} onHide={() => setShowEmployeeEditForm(false)} onSuccess={onEmployeeEditSuccess} />}
    </div>
  )
}

export default EmployeeDetailsPage