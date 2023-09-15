import React, { useState } from "react";

function SingleTask({ tasks }) {
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const toggleCommentVisibility = (taskId) => {
    console.log(taskId);
    setIsCommentVisible(!isCommentVisible);
  };
  const [comments, setComments] = useState({});
  const [commentator, setCommentator] = useState("tareq");

  const handleSendClick = (taskId) => {
    const taskComments = comments[taskId] || "";
    console.log(taskId, taskComments, commentator);
  };

  const handleTextareaChange = (taskId, event) => {
    const updatedComments = { ...comments };
    updatedComments[taskId] = event.target.value;
    setComments(updatedComments);
  };

  return (
    <div>
      {tasks
        .map((task) => (
          <div key={task.taskId}>
            <div className="p-4 bg-white my-2 rounded-md shadow">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500 ">
                  Due date : {task.dueDate}
                </p>

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
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>

              <h5 className="text-xl font-bold py-1">{task.title}</h5>
              <p className="py-2">{task.description}</p>
              <div className="">
                <div
                  onClick={() => toggleCommentVisibility(task.taskId)}
                  className="flex text-lg items-center border border-gray-400 w-16 px-1 justify-center rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                  <p className="pb-1 text-sm"> 10</p>
                  {isCommentVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  )}
                </div>
                <div className="relative w-full h-10">
                  {isCommentVisible && (
                    <div className="mt-4">
                      kcvmvlkmsdfv
                      {/* Comment section content here */}
                      <div className="flex text-lg items-center">
                        {/* ... Comment content */}
                        kdskdfvndf
                      </div>
                      <div className="relative w-full h-10">
                        <textarea
                          className="w-full border border-gray-400 py-1 px-2 rounded-lg h-full"
                          placeholder="Comments here"
                          onChange={(event) =>
                            handleTextareaChange(task.id, event)
                          }
                        ></textarea>
                        <svg
                          onClick={() => handleSendClick(task.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-2 text-green-500 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
}

export default SingleTask;
