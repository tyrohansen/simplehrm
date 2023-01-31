import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Image, Row, Tab, Table, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { fetchEmployeeById } from '../../services/employee-service';
import {getBaseUrl, url} from "../../services/axiosApi";
import { fetchEmployeeLeaveRequests } from '../../services/leave-service';
import LeaveForm from './LeaveForm';
import PhotoForm from './PhotoForm';
import EmployeeEditForm from './EmployeeEditForm';
import AlertContext from '../widgets/alertPopup/AlertContext';
import { fetchEmployeeDocuments } from '../../services/document-service';
import DocumentForm from './DocumentForm';


function EmployeeDetailsPage() {
  const {id} = useParams();
  let {setAlert} = useContext(AlertContext);
  const [employee, setEmployee] = useState({});
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [showLeaveRequestForm, setShowLeaveRequestForm] = useState(false);
  const [showPhotoEditForm, setShowPhotoEditForm] = useState(false);
  const [showEmployeeEditForm, setShowEmployeeEditForm] = useState(false);
  const [showDocumentForm, setShowDocumentForm] = useState(false);

  useEffect(() => {
    getEmployeeDetails(id);
    
    getEmployeeLeaveRequests(id);
    getEmployeeDocuments(id);
  },[id]);

  const getEmployeeDetails = async (id) => {
     await fetchEmployeeById(id).then(response => {
        setEmployee(response.data)
      }).catch(error => {
        setAlert("An Error occurred fetching staff details", "danger")
     })
  }

  const getEmployeeLeaveRequests = async (id) => {
      await fetchEmployeeLeaveRequests(id).then(response => {
        setLeaveRequests(response.data);
      }).catch(error => {
        setAlert("An error Occurred!", "danger")
      })
  }

  const getEmployeeDocuments = async (id) => {
    await fetchEmployeeDocuments(id).then(response => {
      setDocuments(response.data)
    })
  }

  const onPhotoChangeSuccess = () => {
    setShowPhotoEditForm(false);
    getEmployeeDetails(id);
    setAlert("Uploaded photo successfully", "success")
  }

  const onEmployeeEditSuccess = (message) => {
    getEmployeeDetails(id);
    setShowEmployeeEditForm(false);
    setAlert(message, "success")

  }

  const onLeaveRequestSuccess = () => {
     getEmployeeLeaveRequests(id);
     setShowLeaveRequestForm(false);
     setAlert("Leave request recorded successfully")
  }

  const onDocumentUploadSuccess =(message) => {
     getEmployeeDocuments(id);
     setShowDocumentForm(false);
     setAlert(message, "success");
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
                <Button variant='success' onClick={() => setShowDocumentForm(true)}>New Document</Button>&nbsp;&nbsp;
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
                        <td>{employee.gender}</td>
                        </tr>
                        <tr>
                        <th>Created</th>
                        <td>{employee.CreatedAt}</td>
                        </tr>
                        <tr>
                        <th>Last Updated</th>
                        <td>{employee.UpdatedAt}</td>
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
                        <td>{employee && employee.department_id}</td>
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
            <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>File Name</th>
                    <th>Category</th>
                    <th>Created</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
               {documents && documents.map((item, i) => (
                <tr key={`document-${i}`}>
                <td>{i + 1}</td>
                <td>{item.title.substring(0, 15)}</td>
                <td>{item.filename}</td>
                <td>{item.category}</td>
                <td>{item.CreatedAt}</td>
                <td>{item.UpdatedAt}</td>
              </tr>
               ))}
               </tbody>
               </Table>
            </Tab>
            <Tab eventKey="contact" title="Contact" >
          
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
             
            </Tab>
          </Tabs>
              </Card.Body>
            </Card>
              </Col>
            </Row>
          </Col>
        
        </Row>}
        {showLeaveRequestForm && <LeaveForm employee={id} show={showLeaveRequestForm} onHide={() => setShowLeaveRequestForm(false)} onSuccess={onLeaveRequestSuccess} />}
        {showEmployeeEditForm && <EmployeeEditForm employeeId={id} show={showEmployeeEditForm} onHide={() => setShowEmployeeEditForm(false)} onSuccess={onEmployeeEditSuccess} />}
        {showDocumentForm && <DocumentForm employeeId={id}  show={showDocumentForm} onHide={() => setShowDocumentForm(false)} onSuccess={onDocumentUploadSuccess} />}
    </div>
  )
}

export default EmployeeDetailsPage