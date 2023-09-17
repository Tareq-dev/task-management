import React, { useState } from "react";
import EditForm from "./EditForm";

function Edit() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedData, setEditedData] = useState(null);

  const initialData = {
    description: "Draft a detailed project proposal...",
    dueDate: "2023-09-15",
    email: "tareq@gmail.com",
    status: "backlog",
    taskId: "1694767640300",
    title: "Create Project Proposal",
  };

  const handleEditClick = () => {
    setEditedData(initialData);
    setShowEditForm(true);
  };

  const handleEditFormClose = () => {
    setShowEditForm(false);
  };

  const handleEditFormSubmit = (editedFormData) => {
    console.log("Edited Data:", editedFormData);
    setShowEditForm(false);
    // You can perform additional actions here, such as updating the data in your app's state or sending it to an API.
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      {/* Display your data */}
      <div>
        <button
          className="bg-black text-white px-10 py-4 text-2xl"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>

      {/* Render the EditForm component */}
      {showEditForm && (
        <EditForm
          data={editedData}
          onClose={handleEditFormClose}
          onSave={handleEditFormSubmit}
        />
      )}
    </div>
  );
}
export default Edit;
