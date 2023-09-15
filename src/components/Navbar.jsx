import React, { useState } from "react";
import { Link } from "react-router-dom";
import TaskForm from "./Taskform";
import { signOut } from "firebase/auth";
import { auth } from "../context/Firebase";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="flex items-center justify-between w-full my-4">
      <ul className="flex text-lg gap-10 text-gray-500">
        <li className="px-2 py-1 rounded-lg text-white bg-purple-400 font-semibold">
          <Link>My projects</Link>
        </li>
        <li>
          <Link>Schedule</Link>
        </li>
        <li>
          <Link>Team</Link>
        </li>
      </ul>
      <div className=" flex items-center gap-4">
        <button
          onClick={openModal}
          className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 cursor-pointer  px-4 rounded-xl "
        >
          Add Task
        </button>
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
        <button className="btn btn-ghost btn-circle">
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
        </button>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
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
      </div>
    </div>
  );
}

export default Navbar;
