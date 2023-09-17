import React, { useState } from "react";
import { Link } from "react-router-dom";
import TaskForm from "./Taskform";
import { signOut } from "firebase/auth";
import { auth, useFirebase } from "../context/Firebase";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useFirebase();

  const openModal = () => {
    if (user?.email) {
      setIsModalOpen(true);
    } else {
      toast.error("Please Login First!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success(" Logout succesfull!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      <div className="hidden md:flex items-center justify-between w-full my-4">
        <ul className="flex items-center   gap-10 text-gray-500">
          <li className="px-2 rounded-lg  font-semibold">
            <Link
              to="/"
              className="text-xl flex justify-center gap-3 items-center"
            >
              <img className="w-10" src={logo} alt="" />
              <p>
                <span className="text-3xl text-orange-400 font-extrabold">
                  T
                </span>
                ask Management
              </p>
            </Link>
          </li>
        </ul>

        <div className=" flex items-center gap-10">
          <button
            onClick={openModal}
            className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 cursor-po
          inter px-4 rounded flex justify-between items-center "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add Task
          </button>
          <div
            className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 cursor-po
          inter  px-4 rounded flex justify-between items-center "
          >
            <Link to="/team">Team</Link>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="modal modal-open">
                <div className="modal-box">
                  <div className="flex items-center justify-center">
                    <TaskForm onClose={closeModal} />
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop"></form>
              </div>
            </div>
          )}
          {/* <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button> */}
          {user && user?.email ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-purple-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="px-1 py-1 text-xs rounded-md bg-green-100">
                      {user?.email}
                    </span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 cursor-pointer  px-4 rounded-xl"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="navbar bg-base-100  md:hidden">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/team">Team</Link>
              </li>
              <li>
                <Link to="/all-task">All Tasks</Link>
              </li>
              {!user ? (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              ) : (
                <li>
                  {" "}
                  <button onClick={logout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link
            to="/"
            className="text-xl flex justify-center gap-1 items-center"
          >
            <img className="w-6" src={logo} alt="" />
            <p className="text-sm">
              <span className="text-xl text-orange-400 font-extrabold">T</span>
              ask management
            </p>
          </Link>
        </div>
        <div className="navbar-end">
          <button
            className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-1 cursor-po
          inter px-1 rounded flex justify-between items-center text-sm"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
