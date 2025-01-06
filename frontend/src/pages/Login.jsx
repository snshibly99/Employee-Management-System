import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9999/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center h-screen justify-center bg-[#DDE6ED]"
    >
      <div className="flex flex-col md:flex-row w-[80%] max-w-[900px] bg-white shadow-lg rounded-md overflow-hidden">
        {/* Illustration Section */}
        <div
          className="hidden md:flex flex-col justify-center items-center w-[50%] bg-[#526D82] p-6 text-white"
        >
          <div className="w-full h-full flex flex-col justify-center items-center">
            {/* Circular Area with Analytics Icon */}
            <div className="w-36 h-36 bg-[#9DB2BF] rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-[#526D82]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 3v18m4-10v10m-8-6v6m12-14v14"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold">Welcome to EMS</h2>
            <p className="text-center mt-2">
              Provide credentials to login!
            </p>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-[50%] p-8">
          <h2 className="text-3xl font-bold text-[#27374D] mb-6">EMS Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#27374D] font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9DB2BF]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-[#27374D] font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9DB2BF]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="inline-flex items-center text-[#27374D]">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-[#526D82] hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-[#27374D] rounded-md hover:bg-[#526D82] transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-[#27374D]">
            Don't have an account?{" "}
            <a href="#" className="text-[#526D82] hover:underline">
              Create new account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
