import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Col,Row, Table } from 'react-bootstrap';
import EmployeeForm from './EmployeeForm';
import { fetchEmployees } from '../../services/employee-service';

function EmployPage() {
  const [employees, setEmployees] = useState([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  //const navigate = useNavigate()

  useEffect(() =>{
    getEmployeeList();
  },[]);



  const getEmployeeList = async () => {
      const items = await fetchEmployees().then(
        response => {
          
          setEmployees(response.data)
        }
      ).catch(error => {
        console.log("An error occurred!")
      });
      
  }

  const onEmployeeFormSuccess = () => {
    getEmployeeList();
    setShowEmployeeForm(false);
  }

  return (
    <div>
      <h3>Employees</h3>
      <Row className='my-3'>
        <Col md={12}>
          <Button variant='primary' onClick={() => setShowEmployeeForm(true)}>Add Employee</Button>
          {showEmployeeForm && <EmployeeForm show={showEmployeeForm}  onHide={() => setShowEmployeeForm(false)} onSuccess={onEmployeeFormSuccess} />}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Department</th>

                  <th>Position</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                
                {employees.map((item, i) => (
                  <tr key={i}>
                  <td>{item.ID}</td>
                  <td>{item.first_name} {item.last_name}</td>
                  <td>{item.gender}</td>
                  <td>{item.department_id}</td>
                  <td>{item.job_title}</td>
                  <td>{item.emergency_contact}</td>
                  <td></td>
                </tr>
                ))}
                
              </tbody>
            </Table>
        </Col>
      </Row>
      
    </div>
  )
}

export default EmployPage