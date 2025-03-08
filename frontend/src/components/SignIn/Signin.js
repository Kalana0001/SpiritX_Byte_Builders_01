import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Signin.css';
import sign1 from '../../assets/sign1.png';
function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className='container'>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="icon"><FontAwesomeIcon icon={faEnvelope} /></i>
              <input 
                type="email" 
                name='email' 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div className="input-field">
              <i className="icon"><FontAwesomeIcon icon={faLock} /></i>
              <input 
                type={showPassword ? 'text' : 'password'} 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                name='password' 
                placeholder="Enter password" 
                required 
              />
              <i className="show-password" onClick={togglePasswordVisibility}>
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </i>
            </div>

            <button type="submit" className="btn">Sign In</button> 
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Police Officer</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
          </div>
          <img src={sign1} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Signin;
