import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
  const { captain, setCaptain } = useContext(CaptainDataContext); // Get captain data from context
  const [isLoading, setIsLoading] = useState(true); // Local loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    // Redirect to login if no token is found
    if (!token) {
      navigate('/captain-login');
      return;
    }

    // Fetch captain profile
    const fetchCaptainProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/captains/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCaptain(response.data.captain); // Update captain context
        } else {
          navigate('/captain-login'); // Redirect if unauthorized
        }
      } catch (error) {
        console.error('Error fetching captain profile:', error);
        navigate('/captain-login');
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    };

    fetchCaptainProfile();
  }, [navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading spinner while fetching data
  }

  return <>{children}</>; // Render children after loading
};

export default CaptainProtectedWrapper;
