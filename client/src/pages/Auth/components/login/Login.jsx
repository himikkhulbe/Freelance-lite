import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault()

        const user = {
          email,
          password
        }

        console.log(user)
        // const res = await fetch('http://localhost:8000/api/user/login', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password }),
        // });

    //     const data = await res.json();
 
    //     if(res.ok){
    //         navigate('/profile')
    //     }

    }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-100 to-blue-600 overflow-hidden">
      <div className="flex flex-col relative left-12 pt-[20%] gap-2">
        <h3 className="text-3xl font-bold">Welcome to</h3>
        <h1 className="text-[2.5rem] font-extrabold text-nowrap text-[#072ac8] text-shadow-md">
          FREELANCE LITE
        </h1>
      </div>
      <div className="w-[85%] h-[50%] bg-white rounded-2xl shadow-xl mx-auto mt-[25%] p-5 flex flex-col items-center gap-8">
        <h4 className="text-2xl font-normal mt-5">Log in</h4>
        <h6 className="text-zinc-400 text-sm -mt-6">
          Enter the details below to login
        </h6>
        <form className="flex flex-col w-full gap-6" onSubmit={handleLogin}>
          <div className="w-full flex flex-col gap-1">
            <label className="text-zinc-500 ml-1">
              Email address
            </label>
            <input
              type="text"
              className="rounded-full border border-zinc-400 px-3 py-2 text-zinc-500"
              onChange={(e)=> setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-zinc-500 ml-1">Password</label>
            <input
              type="password"
              className="rounded-full border border-zinc-400 px-3 py-2 text-zinc-500"
              onChange={(e)=> setPassword(e.target.value)}
              value={password}             
            />
          </div>

          <button className="py-3 px-3 w-full rounded-full bg-blue-600 hover:bg-blue-800 text-white transition duration-200 flex justify-center items-center gap-5 font-semibold">
            Log in <IoMdLogIn size={25} />
          </button>
        </form>
        <div className="flex gap-1">
          <p className="font-semibold">Don't have an account?</p>
          <Link to="/" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
