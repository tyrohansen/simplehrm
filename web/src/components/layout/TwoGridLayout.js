import FeatherIcon from 'feather-icons-react';
import React from 'react'
import { Link } from 'react-router-dom'

function TwoGridLayout({ children, }) {
  return (
    <>
<div className="container-fluid">
  <div className="row">
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link" to="/">
            <FeatherIcon icon="home"  className="align-text-bottom"  />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/employees">
             
              <FeatherIcon icon="users" className="align-text-bottom" />
              People
            </Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/departments">
              <FeatherIcon icon="shopping-cart" className="align-text-bottom" />
              Departments
            </Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/leave">
              <FeatherIcon icon="layers" className="align-text-bottom" />
              Leave
            </Link>
          </li>
         
         
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
          <span>Saved reports</span>
          <a className="link-secondary" href="#" aria-label="Add a new report">
            <FeatherIcon icon="plus-circle" className="align-text-bottom" />
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FeatherIcon icon="file-text" className="align-text-bottom" />
              Current month
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FeatherIcon icon="file-text" className="align-text-bottom" />
              Last quarter
            </a>
          </li> 
        </ul>
      </div>
    </nav>

    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-5">
    
      {children}
    </main>
  </div>
</div>
    </>
  )
}

export default TwoGridLayout