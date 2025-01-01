import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const { setUserData } = useContext(UserDataContext); // Use context directly
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };  
    // console.log(newUser);
    

    try {
      const response = await axios.post("http://localhost:3000/users/register", newUser);

      if (response.status === 201) {
        const data = response.data;
        setUserData(data.user); // Update context with user data
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }

    // Clear form fields
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  };

  return (
    <div className="p-7 font-[poppins] flex flex-col justify-between">
      <div>
        <img className="w-20 mb-10" src="/images/uberlogo.png" alt="Uber Logo" />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex space-x-4 mb-5">
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 border text-lg placeholder:text-base py-2"
              type="text"
              placeholder="First Name"
            />
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 border text-lg placeholder:text-base py-2"
              type="text"
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#eeeeee] mb-4 rounded px-4 border w-full text-lg placeholder:text-base py-2"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">What's your Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#eeeeee] mb-4 rounded px-4 border w-full text-lg placeholder:text-base py-2"
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold rounded px-4 border w-full text-lg placeholder:text-base py-2">
            Register
          </button>

          <p className="text-center">
            Already have an account? &nbsp;
            <Link to="/login" className="text-center text-blue-600 font-semibold text-lg">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link to="/captain-login">
          <button className="bg-[#10b461] mt-32 text-white font-semibold rounded px-4 border w-full text-lg placeholder:text-base py-2">
            Sign in as Captain
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserSignUp;
