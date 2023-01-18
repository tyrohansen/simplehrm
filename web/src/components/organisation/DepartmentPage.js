import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { fetchDepartments } from '../../services/departments-service';
import DepartmentForm from './DepartmentForm';

function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);


  useEffect(() => {
    getAllDepartments()
  },[]);

  const getAllDepartments = async () => {
      await fetchDepartments().then(
        response => {
          setDepartments(response.data)
        }
      ).catch(error => {
        console.log("An error occurred!")
      })
      
   }

  const closeAndRefreshForm = () => {
    setShowDepartmentForm(false);
    getAllDepartments();
  }

  return (
    <div>
      <h1>Departments</h1>
      <Row>
        <Col md={12}>
          <Button variant='primary' onClick={() => setShowDepartmentForm(true)}>New Department</Button>
          <DepartmentForm show={showDepartmentForm} onHide={() => setShowDepartmentForm(false) } onSuccess={closeAndRefreshForm} />
        </Col>
        <Col md={12}>
        <Table>
        <thead>
          <tr>
            <td>id</td>
            <td>Name</td>
            <td>ShortName</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          { departments.map((item, i) => (
          <tr key={i}>
            <td>{item.ID}</td>
            <td>{item.name}</td>
            <td>{item.short_name}</td>
            <td>{item.CreatedAt}</td>
          </tr>))}
        </tbody>
      </Table>
        </Col>
      </Row>
     
    </div>
  )
}

export default DepartmentPage