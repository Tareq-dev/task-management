import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../context/Firebase";
import toast from "react-hot-toast";
import { ref, set } from "firebase/database";

function SignUp() {
  const [signupData, setSignupData] = useState({
    userName: "",
    designation: "",
    email: "",
    password: "",
  });

  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !signupData.userName ||
      !signupData.email ||
      !signupData.password ||
      !signupData.designation
    ) {
      setSignupError("Please fill in all fields.");
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
          const designation = signupData?.designation;

          if (user?.email) {
            navigate("/");
            toast.success("Successfully created");
            try {
              const userRef = ref(db, `users/${uid}`);
              const userData = { uid, name, designation, email };
              set(userRef, userData);
            } catch (error) {}
          }
        })
        .catch((error) => {
          if (error.code === "auth/weak-password") {
            setSignupError("Password should be 6 characters.");
          } else if (error.code === "auth/email-already-in-use") {
            setSignupError("Email is already in use.");
          } else {
            setSignupError("An error occurred. Please try again later.");
          }
        });
      setSignupError("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-1/3 bg-purple-200 px-10 md:px-8 py-4 md:py-10 rounded-md">
        <h1 className="text-2xl font-semibold mb-2 md:mb-4 text-center uppercase">
          Sign up
        </h1>
        <form onSubmit={handleSignup}>
          <div className="flex justify-between gap-2">
            <div className="mb-2 md:mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Full Name:
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="Enter your Name"
                value={signupData.userName}
                onChange={(e) =>
                  setSignupData({ ...signupData, userName: e.target.value })
                }
                className="w-full px-2 md:p-2 border rounded outline-none"
              />
            </div>
            <div className=" mb-2 md:mb-4">
              <label htmlFor="designation" className="block text-gray-700">
                Designation:
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                placeholder="Enter your designation"
                value={signupData.designation}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    designation: e.target.value,
                  })
                }
                className="w-full px-2 md:p-2 border rounded outline-none"
              />
            </div>
          </div>
          <div className="mb-2 md:mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              className="w-full px-2 md:p-2 border rounded outline-none"
            />
          </div>
          <div className="mb-2 md:mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              className="w-full px-2 md:p-2 border rounded outline-none"
            />
          </div>

          <p>
            Allready have account?
            <Link to="/login" className="underline text-blue-500">
              Login
            </Link>
          </p>
          {signupError && (
            <div className="flex justify-center">
              <span className="text-red-500 my-2 text-center bg-white px-2 rounded-md">
                {signupError}
              </span>
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Signup
            </button>
          </div>
          <Link
            to="/"
            className="flex justify-center items-center mt-4 md:mt-8 gap-4"
          >
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
