import React, { useContext, useEffect } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({ children }) => {
  const { userData } = useContext(UserDataContext); // Get userData from context
  const token = localStorage.getItem('token'); // Get token from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // If there is no token or userData, redirect to login page
    if (!token || !userData?.email) {
      navigate('/login');
    }
  }, [token, userData, navigate]); // Depend on token, userData, and navigate

  return <>{children}</>;
};

export default UserProtectedWrapper;
