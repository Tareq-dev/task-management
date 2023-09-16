import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import { useFirebase } from "../context/Firebase";

function AllTaskList() {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState({});
  const { tasks } = useFirebase();
  const handleAccordionClick = (index) => {
    setOpenAccordion(index);
  };

  const handleCommentInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleSendComment = () => {
    if (commentInput.trim() === "") return;

    const taskId = tasks[openAccordion].id; // Assuming your task objects have an 'id' property
    const newComment = {
      id: Date.now(),
      text: commentInput,
    };

    setComments({
      ...comments,
      [taskId]: [...(comments[taskId] || []), newComment],
    });

    setCommentInput("");
  };

  return (
    <div>
      <Navbar />
      <h2 className="text-2xl font-bold text-center mt-14">Manage All Task </h2>
      <p className="text-center py-2 text-gray-500">
        Managing your all tasks is easy with Task Management
      </p>
      <div>
        <div className="flex justify-center items-center gap-10 mt-8">
          <button className="py-2 px-4 bg-orange-400 font-bold rounded">
            Backlog
          </button>
          <button className="py-2 px-4 bg-purple-400 font-bold rounded">
            Backlog
          </button>
          <button className="py-2 px-4 bg-green-400 font-bold rounded">
            Backlog
          </button>
        </div>
        <div>
          {tasks.map((task, index) => (
            <div key={task.id} className="mb-4">
              <div
                className="bg-blue-200 py-2 px-4 rounded-md cursor-pointer"
                onClick={() => handleAccordionClick(index)}
              >
                <h2 className="text-lg font-semibold">{task.title}</h2>
              </div>
              {index === openAccordion && (
                <div className="bg-gray-100 p-4 rounded-md mt-2">
                  <p className="mb-4">{task.description}</p>

                  <h3 className="text-lg font-semibold mb-2">Comments</h3>
                  {comments[task.id]?.map((comment) => (
                    <div key={comment.id} className="bg-white p-2 mb-2 rounded">
                      {comment.text}
                    </div>
                  ))}

                  <div className="flex mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentInput}
                      onChange={handleCommentInputChange}
                      className="w-full border rounded-l py-2 px-4"
                    />
                    <button
                      onClick={handleSendComment}
                      className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllTaskList;
