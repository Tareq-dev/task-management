// src/components/Modal.js

import React, { useState } from 'react';
import { useFirebase } from '../context/Firebase';

const Modal = ({ isOpen, onClose }) => {
    const {user,handleCreateTask} = useFirebase()
  const today = new Date().toISOString().substr(0, 10);
  const initialFormData = {
    dueDate: today,
    title: "",
    description: "",
    status: "backlog",
    email: user?.email,
    assignedUser: "",
    comments: [],
  };
  
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     
    const email = user?.email;
    const taskId = Date.now().toString();
    handleCreateTask(
      taskId,
      formData.dueDate,
      formData.title,
      formData.description,
      formData.status,
      formData.assignedUser,
      email
    );
    setFormData(initialFormData);
    onClose();
  };
  return (
    <div className={modalClasses}>
      <div className="modal-overlay  absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-2 text-left px-6">
          <div className="flex justify-between items-center pb-1">
            <p className="text-2xl font-bold">Create Your Task</p>
            <button onClick={onClose} className="modal-close cursor-pointer z-50 p-1 rounded-full bg-black w-15 h-15">
              <svg
                className="fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M1.293 1.293a1 1 0 011.414 0L9 7.586l6.293-6.293a1 1 0 111.414 1.414L10.414 9l6.293 6.293a1 1 0 01-1.414 1.414L9 10.414l-6.293 6.293a1 1 0 01-1.414-1.414L7.586 9 1.293 2.707a1 1 0 010-1.414z"
                ></path>
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.dueDate}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="assignee">
            Assignee Name (Optional)
          </label>
          <input
            type="text"
            id="assignedUser"
            name="assignedUser"
            placeholder='Enter assignee name'
            value={formData.assignedUser}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title" 
            required
            value={formData.title}
            placeholder='Enter title'
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder='Enter description'
            value={formData.description}
            required
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          ></textarea>
        </div>
         
        <div className="mb-2">
          <label htmlFor="status" className="block text-gray-700 font-medium">
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="backlog">Backlog</option>
            <option value="processing">Processing</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <div className="mt-3 flex justify-center">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Task
          </button>
        </div>
      </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
