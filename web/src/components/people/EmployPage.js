import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col,Row, Table } from 'react-bootstrap';
import EmployeeForm from './EmployeeForm';
import { fetchEmployees } from '../../services/employee-service';
import AlertContext from '../widgets/alertPopup/AlertContext';

function EmployPage() {
  let {setAlert} = useContext(AlertContext);
  const [employees, setEmployees] = useState([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const navigate = useNavigate()

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

  const onEmployeeFormSuccess = (message) => {
    getEmployeeList();
    setShowEmployeeForm(false);
    setAlert(message, "success")
    
  }

  return (
    <div>
      <h3>Staff List</h3>
      <Row className='my-3'>
        <Col md={12}>
          <Button variant='primary' onClick={() => setShowEmployeeForm(true)}>Add Member</Button>
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
                  <th>Joined</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                
                {employees.map((item, i) => (
                  <tr key={i}>
                  <td>{item.ID}</td>
                  <td><Link to={`/employees/` + item.ID}>{item.first_name} {item.last_name}</Link></td>
                  <td>{item.gender}</td>
                  <td>{item.Department.short_name}</td>
                  <td>{item.job_title}</td>
                  <td>{item.emergency_contact}</td>
                  <td>{item.date_joined}</td>
                  <td>{item.UpdatedAt}</td>
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