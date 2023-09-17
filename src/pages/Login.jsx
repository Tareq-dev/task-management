import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../context/Firebase";
import { toast } from "react-toastify";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setLoginError("Please fill in all fields.");
    } else {
      signInWithEmailAndPassword(auth, loginData.email, loginData.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user?.email) {
            toast.success("Login successfully!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate("/");
          }
          // ...
        })
        .catch((error) => {
          if (error.code === "auth/invalid-login-credentials") {
            setLoginError("Invalid email or password");
          } else if (error.code === "auth/user-not-found") {
            setLoginError("User not found.");
          } else if (error.code === "auth/wrong-password") {
            setLoginError("Incorrect password.");
          } else {
            console.log(error.message);
            setLoginError("An error occurred. Please try again later.");
          }
        });
      setLoginError("");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-1/3 bg-purple-200 border shadow px-10 md:px-24 py-10 rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-center uppercase">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full outline-none px-2 md:p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="w-full outline-none px-2 md:p-2 border rounded"
            />
          </div>
          <p>
            Don't have account?{" "}
            <Link to="/signUp" className="underline text-blue-500">
              Creat one
            </Link>
          </p>
          {loginError && (
            <div className="flex justify-center">
              <span className="text-red-500 my-2 text-center bg-white px-2 rounded-md">
                {loginError}
              </span>
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Login
            </button>
          </div>
          <Link to="/" className="flex justify-center items-center mt-8 gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Back to home
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
