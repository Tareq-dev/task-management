import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../context/Firebase";
import toast from "react-hot-toast";
import { ref, set } from "firebase/database";

function SignUp() {
  const [signupData, setSignupData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      setSignupError("Please fill in all fields.");
    } else if (signupData.password !== signupData.confirmPassword) {
      setSignupError("Passwords do not match.");
    } else {
      createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      )
        .then((userCredential) => {
          const user = userCredential?.user;
          const email = user?.email;
          const uid = userCredential?.user.uid;
          const name = signupData?.userName;

          if (user?.email) {
            navigate("/");
            toast.success("Successfully created");
            try {
              const userRef = ref(db, `users/${uid}`);
              const userData = { uid, name, email };
              set(userRef, userData);
              console.log(
                "User logged in successfully:",
                userCredential.user?.email
              );
            } catch (error) {}
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });

      setSignupError(""); // Clear error on successful signup
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 bg-orange-100 px-24 py-10 rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-center uppercase">
          Sign up
        </h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              User Name:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={signupData.userName}
              onChange={(e) =>
                setSignupData({ ...signupData, userName: e.target.value })
              }
              className="w-full p-2 border rounded outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              className="w-full p-2 border rounded outline-none"
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
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              className="w-full p-2 border rounded outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full p-2 border rounded outline-none"
            />
          </div>
          <p>
            Allready have account?
            <Link to="/login" className="underline text-blue-500">
              Login
            </Link>
          </p>
          <p className="text-red-500 mb-4 text-center">{signupError}</p>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Signup
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

export default SignUp;
