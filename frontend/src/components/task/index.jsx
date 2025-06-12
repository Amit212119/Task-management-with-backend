import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Task = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/user/profile', {
        withCredentials: true, 
      });
      setProfile(response?.data);
    } catch (error) {
      console.log('Profile fetch error:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:4000/user/logout',
        {},
        {
          withCredentials: true, // ✅ send cookies
        }
      );

      toast.success('Logged out successfully!!', {
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Logout failed!';
      toast.error(errMsg);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <h2>Welcome, {profile?.name || 'Profile'}</h2>
        <div  className='rightNav'>
          <button className='profileButton'>{profile?.email}</button>
          <button
            onClick={handleLogout}
            className='logoutButton'>
            Logout
          </button>
        </div>
      </nav>
      
        <ToastContainer />
    </>
  );
};

export default Task;
