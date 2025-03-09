import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../validation/LoginValidation';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signin.css';

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    useEffect(() => {
        const validationErrors = Validation(values);
        setErrors(validationErrors);
    }, [values]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.values(validationErrors).every(err => err === "")) {
            try {
                setIsSubmitting(true);
                const response = await axios.post('http://localhost:8087/login', values);
                const { message, token } = response.data;

                if (message === "Success" && token) {
                    localStorage.setItem('authToken', token);
                    toast.success('Login successful!');
                    navigate('/home');
                } else {
                    setError("Invalid email or password");
                    toast.error('Invalid email or password');
                }
            } catch (err) {
                setError("Something went wrong. Please try again later.");
                toast.error('Something went wrong. Please try again later.');
                console.error("Login error:", err);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-form">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p>Don't have an account? <Link to="/">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Signin;
