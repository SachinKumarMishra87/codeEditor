import React, { useState } from 'react';
import logo from "../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import image from "../images/authPageSide.png";
import { api_base_url } from '../helper';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: pwd
      })
    }).then(res => res.json()).then(data => {
      if (data.success === true) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", data.userId);
        setTimeout(() => {
          window.location.href = "/";
        }, 200);
      } else {
        setError(data.message);
      }
    });
  };

  return (
    <>
      <div className="container w-screen min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[100px] py-[20px] lg:py-0">
        
        {/* Left Section */}
        <div className="left w-full lg:w-[35%] flex flex-col items-center lg:items-start mb-6 lg:mb-0">
          <img className='w-[150px] lg:w-[200px]' src={logo} alt="logo" />
          
          <form onSubmit={submitForm} className='w-full mt-[40px] lg:mt-[60px]'>
            <div className="inputBox w-full mb-4">
              <input 
                required 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                type="email" 
                placeholder='Email' 
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]" 
              />
            </div>

            <div className="inputBox w-full mb-4">
              <input 
                required 
                onChange={(e) => setPwd(e.target.value)} 
                value={pwd} 
                type="password" 
                placeholder='Password' 
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]" 
              />
            </div>

            <p className='text-gray-500'>Don't have an account? <Link to="/signUp" className='text-[#00AEEF]'>Sign Up</Link></p>
            <p className='text-red-500 text-[14px] my-2'>{error}</p>

            <button className="btnBlue w-full mt-[20px] p-3 rounded-lg bg-[#00AEEF] text-white hover:bg-[#008bbd] transition-colors">Login</button>
          </form>
        </div>

        {/* Right Section */}
        <div className="right w-full lg:w-[55%]">
          <img className='w-full h-[40vh] lg:h-[100vh] object-cover' src={image} alt="auth-page-side" />
        </div>
      </div>
    </>
  );
};

export default Login;
