import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../validation/SignupValidation';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './SignUp.css';

const SignUp = () => {
    const [values, setValues] = useState({
        username: "", 
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const existingUsernames = ["testuser", "johnDoe", "admin123"]; 

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors(Validation({ ...values, [name]: value }, existingUsernames));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = Validation(values, existingUsernames);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                setIsSubmitting(true);
                const response = await axios.post('http://localhost:8087/signup', values);
                if (response.status === 201) {
                    toast.success('Sign up successful!'); 
                    navigate('/signin');
                }
            } catch (err) {
                toast.error('Error occurred during sign up. Please try again.');
                console.error('Error:', err);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <form onSubmit={handleSubmit}>
                    <h1>Signup</h1>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input 
                            type='text' 
                            onChange={handleInput} 
                            placeholder='Enter Username' 
                            name='username' 
                            value={values.username} 
                        />
                        {errors.username && <span className='text-danger'>{errors.username}</span>}
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email' 
                            onChange={handleInput} 
                            placeholder='Enter Email' 
                            name='email' 
                            value={values.email} 
                        />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password' 
                            onChange={handleInput} 
                            placeholder='Enter Password' 
                            name='password' 
                            value={values.password} 
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input 
                            type='password' 
                            onChange={handleInput} 
                            placeholder='Confirm Password' 
                            name='confirmPassword' 
                            value={values.confirmPassword} 
                        />
                        {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
                    </div>
                    <button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Sign Up'}
                    </button>
                        <p>Don't have an account? <Link to="/signin">Sign In</Link></p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
