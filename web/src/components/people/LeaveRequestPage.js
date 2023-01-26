import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import { fetchLeaveRequests } from '../../services/leave-service';

function LeaveRequestPage() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  
  useEffect(() => {
    getCurrentLeaveRequests();
  },[]);

  const getCurrentLeaveRequests = async () => {
     await fetchLeaveRequests().then(response => {
        setLeaveRequests(response.data);
     }).catch(error => {
        alert("An Error occurred! Please contact the administrator.")
     })
  }

  return (
    <div><h3>Leave Request</h3>
      
        <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Staff Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Days</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests && leaveRequests.map((item, i) => (
                    <tr key={`leave-${i}`}>
                    <td>{i + 1}</td>
                    <th>{item.employee}</th>
                    <td>{item.start_date.substring(0, 10)}</td>
                    <td>{item.end_date.substring(0, 10)}</td>
                    <td>{item.work_days}</td>
                    <td>{item.reason}</td>
                    <td>{item.status}</td>
                  </tr>
                  ))}
                  
                </tbody>
               </Table>
       
    </div>
  )
}

export default LeaveRequestPage