import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";

const TaskForm = ({ onClose }) => {
  const { user } = useFirebase();
  const { handleCreateTask } = useFirebase();
  const today = new Date().toISOString().substr(0, 10);
  const [task, setTask] = useState({
    dueDate: today,
    title: "",
    description: "",
    status: "backlog",
    email: "",
    assignedUser: "",
    comments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = user?.email;
    const taskId = Date.now().toString();
    handleCreateTask(
      taskId,
      task.dueDate,
      task.title,
      task.description,
      task.status,
      task.assignedUser,
      email
    );

    onClose();
  };
  return (
    <div className="bg-white md:w-full">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>

        <button
          onClick={onClose}
          className="lg:tooltip lg:tooltip-bottom mb-4"
          data-tip="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 bg-purple-400 rounded-full text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-2 mb-2">
          <div className=" w-1/2">
            <label
              htmlFor="dueDate"
              className="block text-gray-700 font-medium"
            >
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className=" w-1/2">
            <label
              className="block text-gray-700 font-medium "
              htmlFor="assignedUser"
            >
              Assigned User (Optional)
            </label>
            <input
              type="text"
              id="assignedUser"
              name="assignedUser"
              value={task.assignedUser}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            rows="4"
            style={{ height: "56px" }}
            className="w-full px-4 py-2   border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="status" className="block text-gray-700 font-medium">
            Status:
          </label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="backlog">Backlog</option>
            <option value="processing">Processing</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg focus:ring focus:ring-blue-300"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
