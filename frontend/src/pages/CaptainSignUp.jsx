import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignUp = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setCaptain } = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const captainData = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        colour: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    }

    try {
      const response = await axios.post('http://localhost:3000/captains/register', captainData)
      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-7 font-[poppins] flex flex-col justify-between'>
      <div>
        <img className="w-20 mb-10" src="/images/uberlogo.png" alt="Uber Logo" />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your Name</h3>
          <div className='flex space-x-4 mb-5'>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded px-4 border text-lg placeholder:text-base py-2'
              type="text"
              placeholder='First Name'
            />
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded px-4 border text-lg placeholder:text-base py-2'
              type="text"
              placeholder='Last Name'
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='bg-[#eeeeee] mb-4 rounded px-4 border w-full text-lg placeholder:text-base py-2'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>What's your Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='bg-[#eeeeee] mb-4 rounded px-4 border w-full text-lg placeholder:text-base py-2'
            type="password"
            placeholder='password'
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
          <div className='flex space-x-4 mb-5'>
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded px-4 border text-lg placeholder:text-base py-2'
              type="text"
              placeholder='Vehicle Color'
            />
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded px-4 border text-lg placeholder:text-base py-2'
              type="text"
              placeholder='Vehicle Plate Number'
            />
          </div>

          <div className='flex space-x-4 mb-5'>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded px-4 border text-lg placeholder:text-base py-2'
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Bike</option>
            </select>
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              className='bg-[#eeeeee] w-1/2 rounded px-4 border text-lg placeholder:text-base py-2'
              type="number"
              placeholder='Vehicle Capacity'
            />
          </div>

          {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

          <button
            className='bg-[#111] text-white font-semibold rounded px-4 border w-full text-lg placeholder:text-base py-2'
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Captain Account'}
          </button>

          <p className='text-center mt-4'>
            Already have an account? &nbsp;
            <Link to='/captain-login' className='text-center text-blue-600 font-semibold text-lg'>
              Login
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link to={'/captain-login'}>
          <button className='bg-[#10b461] mt-32 text-white font-semibold rounded px-4 border w-full text-lg placeholder:text-base py-2'>
            Sign in as User
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CaptainSignUp
