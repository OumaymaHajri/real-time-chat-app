// components/Navbar.js
import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
     if (user?._id) {
       navigate('/chat');
    } else {
      navigate('/');
    }
  };

  return (
    <nav style={styles.navbar} className='d-flex justify-content-between'>

      <div style={styles.left}>
        
        <Link   style={styles.logo}   onClick={handleLogoClick}> 
           <strong>SHADOWCHAT</strong>  
        </Link>
      </div>
      <div style={styles.right}>
        {user ? (
          <Link to="/" style={styles.link} onClick={() => logout()}>
            LOG OUT </Link>
        ) :
          (
            <>
              <Link to="/" style={styles.link}>
                LOG IN        </Link>
              <Link to="/signup" style={styles.link}>
                SIGN UP        </Link></>)}

      </div>
    </nav>


  );
};

const styles = {
  navbar: {

    alignItems: 'center',
    padding: '1.5rem 0 0 0',
    backgroundColor: 'transparent',
    color: '#000',
    marginBottom: '2rem',



  },
  left: {
    flex: 1,
  },
  right: {
    display: 'flex',

  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '1rem'

  },
  logo: {
    color: '#fff',
    textDecoration: 'none',

  },
};

export default Navbar;
