import React, { useContext, useEffect, useState } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap';
import AlertContext from './widgets/alertPopup/AlertContext';
import {fetchEmployeeSummaryReport} from '../services/employee-service'
import {fetchLeaveSummaryReport} from '../services/leave-service'


function Dashboard() {
  let {setAlert} = useContext(AlertContext)
  const [staffSummary, setStaffSummary] = useState()
  const [leaveSummary, setLeaveSummary] = useState()
  useEffect(() => {
    getEmployeeSummary()
    getLeaveRequestSummary()
  }, []);


  const getEmployeeSummary = async () => {
    await fetchEmployeeSummaryReport().then(response => {
      setStaffSummary(response.data)
    }).catch(error => {
      setAlert("An error occurred loading the staff summary report", "danger")
    })
  }

  const getLeaveRequestSummary = async () => {
      await fetchLeaveSummaryReport().then(response => {
        setLeaveSummary(response.data)
      }).catch(error => {
        setAlert("An error occurred fetching leave summary report")
      })
  }
  
  return (
    <div><h2>My Dashboard</h2>

    <Row className='my-5 gx-5'>
      <Col md={3} lg={3}>
        <Card bg='primary' text='light'>
          <Card.Body>
            <h5>Staff No.</h5>
            <h6>{staffSummary && staffSummary.total}</h6>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} lg={3}>
      <Card bg='info'>
          <Card.Body>
            <h5>Staff On Leave.</h5>
            <h6>{leaveSummary && leaveSummary.total}</h6>
          </Card.Body>
        </Card>
      </Col>
      {staffSummary && staffSummary?.GenderSummary.map((item, i ) => (
         <Col md={3} lg={3}>
         <Card bg='secondary' text='light'>
             <Card.Body>
               <h5>{item.gender}</h5>
               <h6>{item.total}</h6>
             </Card.Body>
           </Card>
         </Col>
      ))}
     
    </Row>

    <Row className='gy-5 gx-5'>
      <Col md={6} lg={4}>
      <ListGroup as="ol" numbered>
        {leaveSummary && leaveSummary?.CategorySummary.map((item, i) => (
          <ListGroup.Item
          as="li"
          key={i}
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold"> {item.reason}</div>
          </div>
          <Badge bg="primary" pill>
          {item.count}
          </Badge>
        </ListGroup.Item>
        ))}
        
        </ListGroup>
      </Col>
      <Col md={6}>
        
      </Col>
    </Row>
    
    </div>
  )
}

export default Dashboard