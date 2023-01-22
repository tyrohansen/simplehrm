import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './components/Dashboard';
import EmployPage from './components/people/EmployPage';
import TwoGridLayout from './components/layout/TwoGridLayout';
import LoginScreen from './components/auth/LoginScreen';
import PageNotFound from './components/PageNotFound';
import { Route, Routes } from 'react-router-dom';
import DepartmentPage from './components/organisation/DepartmentPage';
import LeaveRequestPage from './components/people/LeaveRequestPage';
import EmployeeDetailsPage from './components/people/EmployeeDetailsPage';

function App() {
  return (
    <div className="App">
      <TwoGridLayout>
      <Routes>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/employees" element={<EmployPage />}/>
      <Route path="/employees/:id" element={<EmployeeDetailsPage />}/>
      <Route path="/departments" element={<DepartmentPage />}/>
      <Route path="/leave" element={<LeaveRequestPage />}/>
      <Route path="/login" element={<LoginScreen />}/>
      <Route path="*" element={<PageNotFound />}/>

      </Routes>
      </TwoGridLayout>
      
    </div>
  );
}

export default App;
