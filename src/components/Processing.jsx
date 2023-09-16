import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";

function Processing({ tasks }) {
  const [error, setError] = useState("");
  const [comments, setComments] = useState({});
  const [commentator, setCommentator] = useState("tareq");
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const { handleCreateComments } = useFirebase();
  const toggleCommentVisibility = (taskId) => {
    const updatedComments = { ...comments };
    updatedComments[taskId] = !updatedComments[taskId];
    setComments(updatedComments);
    setIsCommentVisible(true);
  };

  const handleSendClick = (taskId) => {
    let taskComments = comments[taskId] || false;
    const comId = Date.now().toString();
    if (typeof taskComments === "string" && taskComments.trim() !== "") {
      handleCreateComments(comId, taskId, commentator, taskComments);
      setComments({});
    } else {
      setError("field can't be empty");
    }
  };

  const handleTextareaChange = (taskId, event) => {
    const updatedComments = { ...comments };
    updatedComments[taskId] = event.target.value;
    setComments(updatedComments);
    setError("");
  };
  const processing = tasks?.filter((task) => task?.status === "processing");

  return (
    <div>
      {processing.map((task, i) => (
        <div key={i}>
          <div className="p-4 bg-white my-2 rounded-md shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500 ">{task.dueDate}</p>
              <div className="flex justify-between gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 hover:bg-gray-200 rounded-full p-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 hover:bg-gray-200 rounded-full p-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>

            <h5 className="text-xl font-bold py-1">{task.title}</h5>
            <p className="py-2">{task.description}</p>
            <div className="">
              <div
                onClick={() => toggleCommentVisibility(task.taskId)}
                className="flex text-lg items-center border border-gray-400 w-16 px-1 justify-center rounded-lg cursor-pointer"
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
                <p className="pb-1 text-sm h-6">
                  {task.comments ? Object.values(task.comments).length : ""}
                  {/* {Object.keys(task?.comments)?.length} */}
                </p>

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
              <div className="relative w-full">
                {comments[task.taskId] && (
                  <div className="mt-2">
                    <div className="text-lg">
                      {task.comments
                        ? Object.values(task.comments).map((comment, i) => (
                            <div key={i} className="">
                              <p className="text-[15px] font-semibold">
                                #{comment.commentator}
                              </p>
                              <p className="text-sm text-gray-500 py-1 ml-1">
                                {comment.taskComments}
                              </p>
                            </div>
                          ))
                        : ""}
                    </div>
                    <div className="relative w-full h-10">
                      <textarea
                        required
                        className="w-full border outline-none border-gray-400 py-1 px-2 rounded-lg h-full"
                        placeholder="Comments here"
                        onChange={(event) =>
                          handleTextareaChange(task.taskId, event)
                        }
                      ></textarea>

                      <svg
                        onClick={() => handleSendClick(task.taskId)}
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
                    {error && (
                      <p className="left-3 text-red-600 text-sm text-center">
                        {error}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Processing;
