import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserLogin = () => {
  const { userData, setUserData } = useContext(UserDataContext); // Correctly use context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const bnda = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:3000/users/login', bnda);

      if (response.status === 200) {
        // console.log("Login successful");
        const data = response.data;
        setUserData(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="p-7 font-[poppins] flex flex-col justify-between">
      <div>
        <img className="w-20 mb-10" src="/images/uberlogo.png" alt="Uber Logo" />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 border w-full text-lg placeholder:text-base py-2"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] mb-7 rounded px-4 border w-full text-lg placeholder:text-base py-2"
            type="password"
            placeholder="Enter your password"
          />

          <button className="bg-[#111] text-white font-semibold rounded px-4 border w-full text-lg placeholder:text-base py-2">
            Login
          </button>

          <p className="text-center">
            Don't have an account? &nbsp;
            <Link to="/signup" className="text-center text-blue-600 font-semibold text-lg">
              Register
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link to="/captain-login">
          <button className="bg-[#10b461] mt-32 text-white font-semibold mb-7 rounded px-4 border w-full text-lg placeholder:text-base py-2">
            Sign in as Captain
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
