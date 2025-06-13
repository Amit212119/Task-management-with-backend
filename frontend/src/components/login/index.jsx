import React, {  useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
  const initialValue = {
    email: '',
    password: '',
  };
  const [loginData, setLoginData] = useState(initialValue);
  const [error, setError] = useState({});
  const navigate = useNavigate();


  const loginValidation = () => {
    let errors = {};
    if (!loginData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!loginData.password.trim()) {
      errors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (!/[A-Z]/.test(loginData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(loginData.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/\d/.test(loginData.password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/[@$!%*?&]/.test(loginData.password)) {
      errors.password = 'Password must contain at least one special character';
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setError((prevErr) => ({ ...prevErr, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginValidation()) {
      try {
        const response = await axios.post('http://localhost:4000/user/login', loginData, {
          withCredentials: true,
        });

        if (response.status === 200 || response.status === 201) {
          toast.success('Login Successful!', {
            autoClose: 3000,
            position: 'top-center',
          });
          setLoginData(initialValue);
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      } catch (error) {
        const errMsg = error.response?.data?.message || 'Login failed!';
        toast.error(errMsg);
        console.error('Login error:', error);
      }
    }
  };

  return (
    <div className='container'>
      <form
        className='loginFormContainer'
        onSubmit={handleSubmit}>
        <p className='heading'>Login</p>
        <div className='loginInputField'>
          <input
            type='email'
            className='loginFormField'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={loginData.email}
          />
          {error && <p className='errorMessage'>{error.email}</p>}
        </div>
        <div className='loginInputField'>
          <input
            type='password'
            className='loginFormField'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={loginData.password}
          />
          {error && <p className='errorMessage'>{error.password}</p>}
        </div>
        <div>
          <button
            type='submit'
            className='loginSubmitButton'>
            Submit
          </button>
          <p className='loginParagraph'>
            Don&apos;t have an account?
            <Link
              to='/signup'
              className='link'>
              Sign up
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
