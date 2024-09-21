import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul className='menu'>
          <li>
            <Link to='/' className='menu-item' onClick={closeSidebar}>
              <FontAwesomeIcon icon={faHome} className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to='/auth/login' className='menu-item' onClick={closeSidebar}>
              <FontAwesomeIcon icon={faSignInAlt} className="nav-icon" />
              <span>Login</span>
            </Link>
          </li>
          <li>
            <Link to='/auth/signup' className='menu-item' onClick={closeSidebar}>
              <FontAwesomeIcon icon={faUserPlus} className="nav-icon" />
              <span>Sign Up</span>
            </Link>
          </li>
          <li>
            <Link to='/dashboard' className='menu-item' onClick={closeSidebar}>
              <FontAwesomeIcon icon={faUser} className="nav-icon" />
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>

      {isOpen && <div className="overlay" onClick={closeSidebar}></div>}
    </>
  );
};

export default Sidebar;
