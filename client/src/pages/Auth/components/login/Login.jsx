import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { AuthContext } from "../../../../contexts/AuthContext";


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:8000/api/user/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data)
    if (res.ok) {
      setUser(data?.user)
      navigate('/profile')
    }

  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-100 to-blue-600 md:bg-gradient-to-r overflow-hidden md:flex md:p-10">
      <div className="flex flex-col w-1/2 relative left-12 pt-[20%] gap-2 md:gap-5">
        <h3 className="text-3xl font-bold">Welcome to</h3>
        <h1 className="text-[2.5rem] md:text-6xl font-extrabold text-nowrap text-[#072ac8] text-shadow-md">
          FREELANCE LITE
        </h1>
      </div>
      <div className="w-[85%] md:w-[40%] h-[50%] md:h-2/3 md:my-auto bg-white rounded-2xl shadow-xl mx-auto mt-[25%] p-5 md:pt-8 flex flex-col items-center gap-8">
        <h4 className="text-2xl md:text-3xl font-normal mt-5">Log in</h4>
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-zinc-500 ml-1">Password</label>
            <input
              type="password"
              className="rounded-full border border-zinc-400 px-3 py-2 text-zinc-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button className="py-3 px-3 w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white duration-200 flex justify-center items-center gap-5 font-semibold">
            Log in <IoMdLogIn size={25} />
          </button>
        </form>
        <div className="flex gap-1">
          <p className="font-semibold">Don't have an account?</p>
          <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-800 duration-200">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
