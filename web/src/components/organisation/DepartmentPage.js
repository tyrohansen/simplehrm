import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { fetchDepartments } from '../../services/departments-service';
import AlertContext from '../widgets/alertPopup/AlertContext';
import DepartmentEditForm from './DepartmentEditForm';
import DepartmentForm from './DepartmentForm';

function DepartmentPage() {
  let {setAlert} = useContext(AlertContext)
  const [departments, setDepartments] = useState([]);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selected, setSelected] = useState(0);


  useEffect(() => {
    getAllDepartments()
  },[]);

  const getAllDepartments = async () => {
      await fetchDepartments().then(
        response => {
          setDepartments(response.data);
          
        }
      ).catch(error => {
        setAlert("An error occurred loading departments","danger");
      })
      
   }

  const closeAndRefreshForm = () => {
    setShowDepartmentForm(false);
    getAllDepartments();
    setAlert("Department Created successfully", "success")
  }

  const handleCloseEditForm = () => {
      getAllDepartments();
      setShowEditForm(false);
      setAlert("Department Updated successfully", "success")
      
  }

  const editDepartment = (id) => {
    setSelected(id);
    setShowEditForm(true)
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
            <th>id</th>
            <th>Name</th>
            <th>ShortName</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { departments.map((item, i) => (
          <tr key={i}>
            <td>{item.ID}</td>
            <td>{item.name}</td>
            <td>{item.short_name}</td>
            <td>{item.CreatedAt}</td>
            <td><Button onClick={() => editDepartment(item.ID)}>Edit</Button></td>
          </tr>))}
        </tbody>
      </Table>
        </Col>
      </Row>
      {showEditForm && <DepartmentEditForm departmentId={selected}  show={showEditForm} onHide={() => setShowEditForm(false)} onSuccess={handleCloseEditForm} />}
    </div>
  )
}

export default DepartmentPage