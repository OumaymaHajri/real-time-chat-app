import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FormGroup,Container}from "reactstrap";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const { signup } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', formData);
            signup(response.data);

            navigate('/chat');
        } catch (err) {
            setError(err.response.data);
        }
    };
    return (

        <Container>
            <div style={{ margin: "7rem  0 0 5rem" }}>
                <h1 className='text-light'>Sign up</h1>
                <form onSubmit={handleSubmit} style={{ marginTop: "3rem", width: "35rem" }}>
                    <FormGroup >
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup >
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </FormGroup>
                    <FormGroup>
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </FormGroup>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <FormGroup>
                        <button className="block-button"  type="submit">Sign up</button>
                    </FormGroup>
                </form>


            </div>
        </Container>

    )
}
