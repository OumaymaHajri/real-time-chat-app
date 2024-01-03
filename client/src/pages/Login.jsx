import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormGroup,Container}from "reactstrap";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
export default function Login() {
   
 
      const [formData, setFormData] = useState({
          email: '',
          password: '',
      });
      const { login } = useContext(AuthContext);

      const [error, setError] = useState(null);
      const navigate = useNavigate();
      const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      
      const handleSubmit = async (e) => {
          e.preventDefault();
      
          try {
              const response = await axios.post('http://localhost:5000/api/users/login', formData);
                login(response.data);
              navigate('/chat');
           } catch (err) {
              setError(err.response.data);
          }
      };
      return (
  
        <Container>
           <div style={{ margin: "10rem  0 0 5rem" }} className='col-md-12'>
              <h1 className='text-light'>Your conversations, simplified.</h1>
              <h1 className='text-light'>Join now!</h1>

              <form onSubmit={handleSubmit} style={{ marginTop: "3rem", width: "35rem" }}>
                   
                  <FormGroup >
                       <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  </FormGroup>
                  <FormGroup>
                       <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                  </FormGroup>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <FormGroup>
                  <button className="block-button" type="submit">Log In</button>
              </FormGroup>
              </form>
             

          </div>
          </Container>

   
      )
 
 
}


