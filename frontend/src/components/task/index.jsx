import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const Task = () => {
  const [profile, setProfile] = useState(null);
  console.log(profile, 'profile');

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get('http://localhost:4000/user/profile', {
          withCredentials: true, // ← explicitly send cookies
        })
        .then((res) => setProfile(res?.data));
    } catch (error) {
      console.log('Profile fetch error:', error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/user/logout', {});

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

  if (!profile) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <nav className='navbar'>
        <h2>Welcome, {profile?.name || 'Profile'}</h2>
        <div>
          <button className='profileButton'>{profile?.email}</button>
          <button
            onClick={handleLogout}
            className='logoutButton'>
            Logout
          </button>
        </div>
      </nav>
      <section className='homeSection'>
        {profile && (
          <div className='DetailContainer'>
            <p className='nameHeading'>
              Welcome, <span className='name'>{profile?.name}</span>
            </p>
            <p className='userInfo'>
              Email: <span className='userDetails'>{profile?.email}</span>
            </p>
            <p className='userInfo'>
              Phone: <span className='userDetails'> {profile?.phone}</span>
            </p>
          </div>
        )}
        <ToastContainer />
      </section>
    </>
  );
};

export default Task;
