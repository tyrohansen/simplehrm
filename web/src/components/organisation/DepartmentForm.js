import React, { useContext, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { createDepartment } from '../../services/departments-service';
import AlertContext from '../widgets/alertPopup/AlertContext';

function DepartmentForm(props) {
  let {setAlert} = useContext(AlertContext)
    const [validated, setValidated] = useState();
    const [formData, setFormData] = useState({
        name:"",
        short_name:""
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        await createDepartment(formData).then(
          response => {
            setAlert("Department Created successfully", "success")
            setFormData({
              name:"",
              short_name:""
          })
            props.onSuccess();
          }
        ).catch(error => {
          setAlert("An error occurred", "danger")
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
            Department Form
          </Modal.Title>
        </Modal.Header>
        <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
        <Row className="gx-2 gy-2">
              <Col md="12">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.name"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" type="text" placeholder="Department Name" value={formData.name} onChange={(e) => handleChange(e)}/>
                  
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.shortname"
                >
                  <Form.Label>Short Name</Form.Label>
                  <Form.Control type="text" name="short_name" placeholder="Short Name for forms" value={formData.short_name} onChange={(e) => handleChange(e)} />
                </Form.Group>
              </Col>
              </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="default">Reset</Button>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
        </Form>
        </Modal>
    </>
  )
}

export default DepartmentForm