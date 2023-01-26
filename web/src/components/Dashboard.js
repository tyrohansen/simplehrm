import React, { useEffect, useState } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap';



function Dashboard() {
  useEffect(() => {
  
  }, []);
  
  return (
    <div><h2>My Dashboard</h2>

    <Row className='my-5 gx-5'>
      <Col md={3} lg={3}>
        <Card bg='primary' text='light'>
          <Card.Body>
            <h5>Staff No.</h5>
            <h6>884</h6>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} lg={3}>
      <Card bg='info'>
          <Card.Body>
            <h5>Staff On Leave.</h5>
            <h6>8</h6>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} lg={3}>
      <Card bg='success' text='light'>
          <Card.Body>
            <h5>Males</h5>
            <h6>84</h6>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} lg={3}>
      <Card bg='warning' text='dark'>
          <Card.Body>
            <h5>Females</h5>
            <h6>67</h6>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className='gy-5 gx-5'>
      <Col md={6} lg={4}>
      <ListGroup as="ol" numbered>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold"> Sick Leave</div>
          </div>
          <Badge bg="primary" pill>
            8
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold"> Annual Leave</div>
          </div>
          <Badge bg="primary" pill>
            9
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold"> Personal Leave</div>
          </div>
          <Badge bg="primary" pill>
            9
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold"> Other Leave</div>
          </div>
          <Badge bg="primary" pill>
            1
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold"> Sick Leave</div>
          </div>
          <Badge bg="primary" pill>
            45
          </Badge>
        </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={6}>
        
      </Col>
    </Row>
    
    </div>
  )
}

export default Dashboard