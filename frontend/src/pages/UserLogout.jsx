import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const UserLogout = () => {
  
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    axios.get('http://localhost:3000/users/logout', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }).catch((error) => {
        console.error('Error during logout:', error);
    }
    );
  return <div>Logging out...</div>;
};

export default UserLogout;
