import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { createLeaveRequest } from '../../services/leave-service';

function LeaveForm(props) {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        employee_id: props.employee,
        start_date: "",
        end_date:"",
        work_days: 0,
        reason:"",
        status:"Approved",
        comment:"",
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidated(false);
        var params = formData;
        params.start_date = new Date(formData.start_date).toISOString()
        params.end_date = new Date(formData.end_date).toISOString()
        params.employee_id = parseInt(formData.employee_id)
        params.work_days = parseInt(formData.work_days)
        await createLeaveRequest(formData).then(response => {
            props.onSuccess();
        }).catch(error => {
            alert("An error Occurred!")
        })
        
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
            Leave Request Form
          </Modal.Title>
        </Modal.Header>
        <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
            <Row className="gx-2 gy-2">
            <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.start_date"
                >
                  <Form.Label>Start date</Form.Label>
                  <Form.Control name="start_date" type="date" placeholder="Start Date" value={formData.start_date} onChange={(e) => handleChange(e)} required/>
                  
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.end_date"
                >
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" name="end_date" placeholder="Last day" value={formData.end_date} onChange={(e) => handleChange(e)} required/>
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.work_days"
                >
                  <Form.Label>Number of Days</Form.Label>
                  <Form.Control name="work_days" type="number" placeholder="work_days" value={formData.work_days} onChange={(e) => handleChange(e)}/>
                  
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.reason"
                >
                  <Form.Label>Reason</Form.Label>
                  <Form.Select aria-label="Default select reason" name="reason" value={formData.reason} onChange={(e) => handleChange(e)}>
                      <option>--------</option>
                      <option value="Annual">Annual Leave</option>
                      <option value="Sick">Sick Leave</option>
                      <option value="Personal">Personal Day</option>
                      <option value="Other">Other</option>
                      
                    </Form.Select>
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.reason"
                >
                  <Form.Label>Comment</Form.Label>
                  <Form.Control type="text" as="textarea" name="comment" placeholder="comment" value={formData.comment} onChange={(e) => handleChange(e)} />
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
  )
}

export default LeaveForm