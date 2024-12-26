import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [captainData, setCaptainData] = useState({})
    const submitHandler = (e) => {
      e.preventDefault()
      setCaptainData({
        email: email,
        password: password
      })
      console.log(captainData);
      
      setEmail('');
      setPassword('');
    }


  return (
    <div className='p-7 font-[poppins] flex flex-col justify-between'>
      <div>
      <img className="w-20 mb-10" src="/images/uberlogo.png" alt="" />

<form action="" onSubmit={(e)=>submitHandler(e)}>
  <h3 className='text-lg font-medium mb-2'>What's your Email</h3>
  <input value={email} onChange={(e)=>setEmail(e.target.value)} required className='bg-[#eeeeee] mb-7 rounded px-4 border w-full text-lg placeholder:text-base py-2 ' type="email" placeholder='email@example.com'/>
  <h3 className='text-lg font-medium mb-2 '>Enter Password</h3>
  <input value={password} onChange={(e)=>setPassword(e.target.value)} className='bg-[#eeeeee] mb-7 rounded px-4 border w-full text-lg placeholder:text-base py-2 ' type="email" placeholder='email@example.com' required type="password" placeholder='password' />
  <button className='bg-[#111] text-white font-semibold   rounded px-4 border w-full text-lg placeholder:text-base py-2 '>Login</button>
  <p className='text-center'> Join a fleet? &nbsp;
  <Link to='/captain-signup' className='text-center text-blue-600 font-semibold text-lg'>Register as Captain </Link></p>
</form>
      </div>
      <div>
        <Link to={'/login'}>
        <button className='bg-[#1f437c] mt-36 text-white font-semibold mb-7 rounded px-4 border w-full text-lg placeholder:text-base py-2 '>Sign in as User</button>
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin