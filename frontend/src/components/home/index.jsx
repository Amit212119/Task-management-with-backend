import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css';
import { useEffect } from 'react';
import Task from '../taskManagement';

const Home = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/user/logout', {}, { withCredentials: true });
      toast.success('Logged out successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error('Logout failed!', err);
    }
  };

  const getProfile = async () => {
    try {
      const res = await axios.get('http://localhost:4000/user/profile', {
        withCredentials: true,
      });
      setProfile(res.data);
    } catch (err) {
      console.log('Profile fetch error:', err);
      navigate('/login');
    }
  };
  return (
    <>
      <nav className='navbar'>
        <h2>
          Welcome, <span className='userName'>{profile?.name || 'Profile'}</span>
        </h2>
        <div className='rightNav'>
          <button className='profileButton'>{profile?.email}</button>
          <button
            onClick={handleLogout}
            className='logoutButton'>
            Logout
          </button>
        </div>
      </nav>
      <Task />
    </>
  );
};

export default Home;
