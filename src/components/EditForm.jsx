import React, { useState } from "react";

const EditForm = ({ data, onClose, onSave }) => {
  const [formData, setFormData] = useState(data);
  // console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // You can perform any validation here before saving
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center bg-black bg-opacity-10 justify-center z-50">
      <div className="bg-white p-4 md:w-96 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-semibold"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData?.title}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-semibold"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData?.description}
              onChange={handleChange}
              className="w-full border h-28 rounded p-2  "
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold">
              Status
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="backlog"
                  checked={formData?.status === "backlog"}
                  onChange={handleChange}
                />
                <span className="ml-2">Backlog</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="processing"
                  checked={formData?.status === "processing"}
                  onChange={handleChange}
                />
                <span className="ml-2">In Progress</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="complete"
                  checked={formData?.status === "complete"}
                  onChange={handleChange}
                />
                <span className="ml-2">Complete</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-semibold"
              htmlFor="assignedUser"
            >
              Assigned User (Username)
            </label>
            <input
              type="text"
              id="assignedUser"
              name="assignedUser"
              value={formData?.assignedUser}
              onChange={handleChange}
              className="w-full border rounded p-2 "
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 "
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 "
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
