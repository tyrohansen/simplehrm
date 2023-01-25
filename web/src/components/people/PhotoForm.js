import React, { useState } from 'react'
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { uploadEmployeePhoto } from '../../services/employee-service';

function PhotoForm(props) {
    let employee = props.employee;
    const [memberPhoto, setMemberPhoto] = useState();

    const handleFileSelect = (event) => {
		setMemberPhoto(event.target.files[0]);
	}

    const handleSubmit = async (e) => {
        e.preventDefault();
		const item = new FormData();
        item.append("photo", memberPhoto);

        await uploadEmployeePhoto(employee, item).then(response => {
            props.close()
        }).catch(error => {
            
        });
    }

  return (
    <>
         <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          keyboard={false}
         
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" >
                Photo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            			
			<Form 	onSubmit={handleSubmit}
							>
								<Row className="g-3">
										
									<Col md="12">
                                    <FloatingLabel
																	controlId="floatingInput"
																	label="Photo"
																	className=""
																>
																	<Form.Control
																		type="file"
																		accept=".jpg,.png,.jpeg"
																		onChange={
																			handleFileSelect
																		}
																	/>
																	<Form.Control.Feedback type="invalid">
																		Please
																		provide
																		a valid
																		photo.
																	</Form.Control.Feedback>
																</FloatingLabel>
									</Col>

									<Col xs="12" className="d-grid gap-2">
										<Button
											variant="primary"
											type="submit"
											size="md"
										>
											Attach
										</Button>
									</Col>
								</Row>
							</Form>
					
          </Modal.Body>
        </Modal>
    </>
  )
}

export default PhotoForm