import React, { useEffect, useState } from 'react'
import { Col, Modal, Row, Form, Button } from 'react-bootstrap';
import { fetchDepartments } from '../../services/departments-service';
import { createEmployee } from '../../services/employee-service';



function EmployeeForm(props) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        gender:"",
        department: 0,
        job_title:"",
        section:"",
        id_no:"",
        nin:"",
        date_joined:"",
        marital_status:"",
        place_of_origin: "",
        residence:"",
        dob:"",
        kin_name:"",
        kin_contact: "",
        photo:"",
        emergency_contact:"",
        comment:""
      });
  const [validated, setValidated] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments();
  },[]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleChangeInteger = (event) => {
    setFormData({ ...formData, [event.target.name]: parseInt(event.target.value) });
  };

  const getAllDepartments = async () => {
     await fetchDepartments().then(response => setDepartments(response.data));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    const items = await createEmployee(formData).then(response => {
        props.onSuccess();
    }).catch(error => {
        console.log("An error occurred!")
    });
    
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Employee Form
          </Modal.Title>
        </Modal.Header>
        <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          
            <Row className="gx-1 gy-1">
            <fieldset>
              <legend>Personal Information</legend>
              <Row className="gx-2 gy-2">
              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.firstname"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control name="first_name" type="text" placeholder="John" value={formData.first_name} onChange={(e) => handleChange(e)}/>
                  
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.lastname"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="last_name" placeholder="Doe" value={formData.last_name} onChange={(e) => handleChange(e)} />
                </Form.Group>
              </Col>

              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.gender"
                >
                  <Form.Label>Gender</Form.Label>
                  <br/>
                  <Form.Check
                    inline
                    label="Male"
                    name="group1"
                    type='radio'
                    id={`inline-radio-1`}
                  />
                  <Form.Check
                    inline
                    label="Female"
                    name="group1"
                    type='radio'
                    id={`inline-radio-1`}
                  />
                </Form.Group>
              </Col>

              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.dob"
                >
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control name="dob" type="date" placeholder="dob" value={formData.dob} onChange={(e) => handleChange(e)}/>
                  
                </Form.Group>
              </Col>

              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.marital_status"
                >
                  <Form.Label>Marital Status</Form.Label>
                  <Form.Select aria-label="Default select marital_status" name="marital_status" value={formData.marital_status} onChange={(e) => handleChange(e)}>
                      <option>--------</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </Form.Select>
                   
                </Form.Group>
              </Col>
              </Row>
              </fieldset>
              <fieldset>
              <legend>Work Information</legend>
              <Row className="gx-2 gy-2">
              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.job_title"
                >
                  <Form.Label>Job Title/Position</Form.Label>
                  <Form.Control name="job_title" type="text" placeholder="Job title" value={formData.job_title} onChange={(e) => handleChange(e)}/>
                  
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.section"
                >
                  <Form.Label>Department</Form.Label>
                  <Form.Select aria-label="Default select department" name="department" value={formData.department} onChange={(e) => handleChangeInteger(e)}>
                      <option>--------</option>
                      {departments.map((item, i) => (
                          <option value={item.ID} key={i}>{item.name}</option>
                      ))}
                      
                    </Form.Select>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.section"
                >
                  <Form.Label>Section</Form.Label>
                  <Form.Control type="text" name="section" placeholder="section" value={formData.section} onChange={(e) => handleChange(e)} />
                </Form.Group>
              </Col>

              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.firstname"
                >
                  <Form.Label>Company ID No.</Form.Label>
                  <Form.Control name="id_no" type="text" placeholder="Company ID No" value={formData.id_no} onChange={(e) => handleChange(e)}/>
                  
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.lastname"
                >
                  <Form.Label>National ID Number</Form.Label>
                  <Form.Control type="text" name="nin" placeholder="nin" value={formData.nin} onChange={(e) => handleChange(e)} />
                </Form.Group>
              </Col>

              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.date_joined"
                >
                  <Form.Label>Date joined</Form.Label>
                  <Form.Control name="date_joined" type="date" placeholder="date_joined" value={formData.date_joined} onChange={(e) => handleChange(e)}/>
                  
                </Form.Group>
              </Col>
              </Row>
             </fieldset>
             <fieldset>
              <legend>Contact Information</legend>
              <Row>
              <Col md="6">
                <Form.Group
                  className="mb-3"
                  controlId="empForm.place_of_origin"
                >
                  <Form.Label>Place of origin</Form.Label>
                  <Form.Control name="place_of_origin" type="text" placeholder="John" value={formData.place_of_origin} onChange={(e) => handleChange(e)}/>
                  
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group
                  className="mb-3"
                  controlId="empForm.residence"
                >
                  <Form.Label>Residence</Form.Label>
                  <Form.Control type="text" name="residence" placeholder="residence" value={formData.residence} onChange={(e) => handleChange(e)} />
                </Form.Group>
              </Col>
              
              <Col md="6">
                <Form.Group
                  className="mb-3"
                  controlId="empForm.residence"
                >
                  <Form.Label>Next of kin name</Form.Label>
                  <Form.Control type="text" name="kin_name" placeholder="next of kin name" value={formData.kin_name} onChange={(e) => handleChange(e)} />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group
                  className="mb-3"
                  controlId="empForm.place_of_origin"
                >
                  <Form.Label>kin_contact</Form.Label>
                  <Form.Control name="kin_contact" type="text" placeholder="kin contact" value={formData.kin_contact} onChange={(e) => handleChange(e)}/>
                  
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group
                  className="mb-3"
                  controlId="empForm.residence"
                >
                  <Form.Label>Emergency contact</Form.Label>
                  <Form.Control type="text" name="emergency_contact" placeholder="emergency contact" value={formData.emergency_contact} onChange={(e) => handleChange(e)} />
                </Form.Group>
              </Col>
              </Row>
              </fieldset>
            </Row>
            <Row>
              <Col md={12}>
              <Form.Group
                  className="mb-3"
                  controlId="empForm.comment"
                >
                  <Form.Label>Notes</Form.Label>
                  <Form.Control type="text" name="comment" placeholder="comment" value={formData.comment} onChange={(e) => handleChange(e)} />
                </Form.Group>
              </Col>
            </Row>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="default">Reset</Button>
          <Button variant="primary" type="submit">Save changes</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default EmployeeForm