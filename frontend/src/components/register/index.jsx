import React, { useState } from 'react';
import './index.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();

  const initialValue = {
    name: '',
    email: '',
    phone: '',
    password: '',
  };

  const [signupData, setSignupData] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!signupData.name.trim()) {
      errors.name = 'Name is required';
    } else if (signupData.name.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }

    if (!signupData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!signupData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(signupData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }

    if (!signupData.password.trim()) {
      errors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (!/[A-Z]/.test(signupData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(signupData.password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/\d/.test(signupData.password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/[@$!%*?&]/.test(signupData.password)) {
      errors.password = 'Password must contain at least one special character';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:4000/user/register', signupData);

        if (response.status === 201 || response.status === 200) {
          toast.success('Registration Successful!', {
            autoClose: 3000,
            position: 'top-center'
          });
          setSignupData(initialValue);
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (error) {
        const errMsg = error.response?.data?.message || 'Registration failed!';
        toast.error(errMsg);
        console.error('Registration error:', error);
      }
      // dispatch(registerUser(signupData));
    }
  };
  return (
    <>
      <div className='parentContainer'>
        <div className='imageContainer'>
          <img
            alt='registration'
            src='registration-jpg.jpg'
            className='image'
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className='signUpForm'>
          <p className='heading'>Sign Up</p>
          <div className='signUpInputContainer'>
            <input
              type='text'
              className='signUpInputField'
              placeholder='Full Name'
              name='name'
              onChange={handleChange}
              value={signupData.name}
            />
            {errors.name && <p className='errorMessage'>{errors.name}</p>}
          </div>
          <div className='signUpInputContainer'>
            <input
              type='email'
              className='signUpInputField'
              placeholder='Email'
              name='email'
              onChange={handleChange}
              value={signupData.email}
            />
            {errors.email && <p className='errorMessage'>{errors.email}</p>}
          </div>
          <div className='signUpInputContainer'>
            <input
              type='number'
              className='signUpInputField'
              placeholder='Phone No.'
              name='phone'
              onChange={handleChange}
              value={signupData.phone}
            />
            {errors.phone && <p className='errorMessage'>{errors.phone}</p>}
          </div>
          <div className='signUpInputContainer'>
            <input
              type='password'
              className='signUpInputField'
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={signupData.password}
            />
            {errors.password && <p className='errorMessage'>{errors.password}</p>}
          </div>
          <div className='btnGroup'>
            <button
              type='submit'
              className='signButton'>
               Sign Up
            </button>
            <p className='signParagraph'>
              Already have an account?
              <Link
                to='/login'
                className='link'>
                Login
              </Link>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Registration;
