import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";

const Login = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("freelancer");
  const [error, setError] = useState("");       

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const validatePassword = (password)=> {
      const lengthCheck = /^.{6,15}$/; // Checks if password is 6–15 chars long
      const letterCheck = /[A-Za-z]/; // Checks if at least 1 letter exists
      const numberCheck = /\d/; // Checks if at least 1 digit exists
      const specialCheck = /[@#$%^&*!?]/; // Checks for at least 1 special char

      return (
        lengthCheck.test(password) &&
        letterCheck.test(password) &&
        numberCheck.test(password) &&
        specialCheck.test(password)
      );
    }

    const user = {
      name,
      username,
      email,
      password,
      role,
    };

    if(!validatePassword(password)){
      alert("Password must be 6-15 characters long and contain at least 1 letter, 1 number, and 1 special character.")
      return
    }
    try {
      const res = await fetch('https://freelance-lite.onrender.com/api/user/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, username, email, password, role })
      });

      if (res.ok) {
        // Signup successful
        navigate("/login");
      } else {
        const error = await res.json();
        console.error(error?.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-100 to-blue-600 md:bg-gradient-to-r overflow-hidden md:flex md:p-10">
      <div className="flex flex-col text-center w-full md:w-1/2 md:pt-[18%] relative pt-[10%] p-5 gap-4 md:gap-5">
        <h1 className="text-[2.5rem] md:text-6xl font-extrabold text-nowrap text-[#072ac8] text-shadow-md">
          FREELANCE LITE
        </h1>
        <h3 className="text-base font-light md:font-medium md:text-lg">
          Connect with top talent and trusted clients worldwide. Hire experts or
          find projects that match your skills. Join now and build your
          freelance success story together!
        </h3>
      </div>
      <div className="w-[85%] md:w-[40%] h-[65%] md:h-[85%] md:my-auto bg-white rounded-2xl shadow-xl mx-auto mt-[8%] px-5 md:pt-8 flex flex-col items-center gap-9">
        <h4 className="text-2xl md:text-3xl font-normal mt-5 md:mt-2">
          Create an account
        </h4>
        <h6 className="text-zinc-400 text-sm -mt-6">
          Sign up and start working or hiring today.
        </h6>
        <form
          className="flex flex-col w-full gap-3 -mt-2"
          onSubmit={handleSignup}
        >
          <div className="w-full flex flex-col gap-1">
            <label className="text-zinc-500 ml-1">Name</label>
            <input
              type="text"
              className="rounded-full border border-zinc-400 px-3 py-2 text-zinc-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-zinc-500 ml-1">Username</label>
            <input
              type="text"
              className="rounded-full border border-zinc-400 px-3 py-2 text-zinc-500"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-zinc-500 ml-1">Email address</label>
            <input
              type="text"
              className="rounded-full border border-zinc-400 px-3 py-2 text-zinc-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-zinc-500 ml-1">Password</label>
            <input
              type="password"
              className="rounded-full border border-zinc-400 px-3 py-2 text-zinc-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="flex gap-8">
            <label className="rounded-full px-2 text-zinc-500">Role : </label>
            <div className="flex gap-3">
              <input
                type="radio"
                value="freelancer"
                onChange={(e) => setRole(e.target.value)}
                checked={role == "freelancer" && true}
                required
              />
              <p className="text-zinc-600">Freelancer</p>
              <input
                type="radio"
                value="client"
                onChange={(e) => setRole(e.target.value)}
                checked={role == "client" && true}
                required
              />
              <p className="text-zinc-600">Client</p>
            </div>
          </div>

          <button className="py-3 px-3 w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white duration-200 flex justify-center items-center gap-5 font-semibold mt-2">
            Sign Up <IoMdLogIn size={25} />
          </button>
        </form>
        <div className="flex gap-1 -mt-4">
          <p className="font-semibold">Already have an account?</p>
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:text-blue-800 duration-200"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
