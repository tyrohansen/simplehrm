import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { createDocument } from '../../services/document-service';


function DocumentForm(props) {
  let employeeId = props.employeeId;
  const [validated, setValidated] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [formData, setFormData] = useState({
        employee_id: props.employeeId,
        title: "",
        filename:"",
        category: 0,
        notes:"",
    });

    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      setValidated(false);
      const item = new FormData();
      item.append("filename", selectedFile);
      item.append("employee_id", employeeId)
      item.append("title", formData.title);
      item.append("category", formData.category);
      item.append("notes", formData.notes);

      await createDocument(item).then(response => {
         props.onSuccess("Uploaded " + formData.title + " to staff folder");
      }).catch(error => {
         alert("An error occurred!");
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
            Document Form
          </Modal.Title>
        </Modal.Header>
        <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
            <Row className="gx-2 gy-2">
            <Col md="12">
              
                <Form.Group
                  className="mb-1"
                  controlId="empForm.title"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" type="text" placeholder="Name or title of the document" value={formData.title} onChange={(e) => handleChange(e)} required/>
                  
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group
                  className="mb-1"
                  controlId="empForm.category"
                >
                  <Form.Label>Category</Form.Label>
                  <Form.Select aria-label="Default select category" name="category" value={formData.category} onChange={(e) => handleChange(e)} required>
                      <option>--------</option>
                      <option value="Identification">Identification</option>
                      <option value="Personal">Personal</option>
                      <option value="HR">HR Document</option>
                      <option value="Other">Other</option>
                      
                    </Form.Select>
                </Form.Group>
              </Col>
              <Col md="12">
              <Form.Label>Document File</Form.Label>
																	<Form.Control
																		type="file"
																		accept=".jpg,.png,.jpeg, .pdf,.docx,.doc"
																		onChange={
																			handleFileSelect
																		}
                                    required
																	/>
																	<Form.Control.Feedback type="invalid">
																		Please
																		provide
																		a valid
																		Document.
																	</Form.Control.Feedback>
																
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

export default DocumentForm