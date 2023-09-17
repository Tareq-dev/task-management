import React, { useState, useEffect } from "react";
import Navbar from "./../components/Navbar";
import { useFirebase } from "../context/Firebase";

function AllTaskList() {
  const { user, userDb, tasks, handleCreateComments } = useFirebase();
  const userData = userDb.find((u) => u.email === user?.email);
  const [error, setError] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [openAccordion, setOpenAccordion] = useState(0);
  const [sortTask, setSortTask] = useState([]);
  const [commentInputs, setCommentInputs] = useState(
    tasks.map(() => ({ commentInputs: "" }))
  );
  const [comments, setComments] = useState({});
  const [accordionStatus, setAccordionStatus] = useState([]);

  useEffect(() => {
    // Initialize accordionStatus when tasks are loaded
    if (tasks.length > 0) {
      setAccordionStatus(tasks.map((_, index) => index === 0));
    }
    setSortTask(tasks);
  }, [tasks]);

  const handleAccordionClick = (index) => {
    setAccordionStatus((prevStatus) =>
      prevStatus.map((status, i) => (i === index ? !status : status))
    );
    setOpenAccordion(index);
  };

  const handleCommentInputChange = (event, index) => {
    const newCommentInputs = [...commentInputs];
    newCommentInputs[index].commentInput = event.target.value;
    setCommentInputs(newCommentInputs);
    setError("");
  };

  const handleSendComment = (index) => {
    if (commentInputs[index].commentInput.trim() === "") {
      setError("Field can't be empty");
    } else {
      const taskId = tasks[index].taskId;

      const comId = Date.now().toString();
      const commentator = userData.name;
      const newComment = {
        comId,
        taskId,
        commentator,
        taskComments: commentInputs[index].commentInput,
      };

      setComments((prevComments) => ({
        ...prevComments,
        [taskId]: [...(prevComments[taskId] || []), newComment],
      }));
      handleCreateComments(
        comId,
        taskId,
        commentator,
        commentInputs[index].commentInput
      );

      // Reset the comment input for this task
      const newCommentInputs = [...commentInputs];
      newCommentInputs[index].commentInput = "";
      setCommentInputs(newCommentInputs);
    }
  };

  const sortByBacklog = () => {
    const backlogTask = tasks.filter((t) => t.status === "backlog");
    setSortTask(backlogTask);
    setTaskStatus("backlog");
  };
  const sortByProcessing = () => {
    const processingTask = tasks.filter((t) => t.status === "processing");
    setSortTask(processingTask);
    setTaskStatus("processing");
  };
  const sortByComplete = () => {
    const completeTask = tasks.filter((t) => t.status === "complete");
    setSortTask(completeTask);
    setTaskStatus("complete");
  };
  console.log(taskStatus);
  return (
    <div>
      <Navbar />
      <h2 className="text-2xl font-bold text-center mt-8">Manage All Task </h2>
      <p className="text-center py-2 text-gray-500">
        Managing your all tasks is easy with Task Management
      </p>
      <div>
        <div className="flex justify-center items-center gap-3 md:gap-10 mt-8">
          <button
            onClick={sortByBacklog}
            className=" px-2 py-1 md:py-2 md:px-4 bg-orange-400 font-bold rounded"
          >
            Backlog
          </button>
          <button
            onClick={sortByProcessing}
            className="px-2 py-1 md:py-2 md:px-4 bg-purple-400 font-bold rounded"
          >
            Processing
          </button>
          <button
            onClick={sortByComplete}
            className="px-2 py-1 md:py-2 md:px-4 bg-green-400 font-bold rounded"
          >
            Complete
          </button>
        </div>
      </div>

      <div
        className={
          (taskStatus === "backlog" &&
            "bg-orange-100 w-full max-w-xl mx-auto p-4 mt-8") ||
          (taskStatus === "processing" &&
            "bg-purple-100 w-full max-w-xl mx-auto p-4 mt-8") ||
          (taskStatus === "complete" &&
            "bg-green-100 w-full max-w-xl mx-auto p-4 mt-8") ||
          "w-full max-w-xl mx-auto p-4 mt-8"
        }
      >
        {sortTask &&
          sortTask.map((task, index) => (
            <div key={task.taskId} className="mb-2 rounded p-4">
              <div
                className="bg-blue-200 py-2 px-4 rounded-md cursor-pointer flex justify-between items-center"
                onClick={() => handleAccordionClick(index)}
              >
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <div className="text-xl">
                  {accordionStatus[index] ? "▼" : "►"}
                </div>
              </div>
              {accordionStatus[index] && (
                <div className="bg-white p-4 rounded-md mt-2">
                  <p className="mb-4">{task.description}</p>

                  <h3 className="text-lg font-semibold mb-2">Comments</h3>
                  <div className="text-lg">
                    {task?.comments && task?.comments
                      ? Object.values(task?.comments)?.map((comment, i) => (
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
                  <div className="flex mt-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentInputs[index]?.commentInput}
                      onChange={(event) =>
                        handleCommentInputChange(event, index)
                      }
                      className="w-full border border-gray-500  rounded-l outline-none py-2 px-4"
                    />
                    <button
                      onClick={() => handleSendComment(index)}
                      className="bg-green-400 px-4 py-2 rounded-r hover:bg-blue-600"
                    >
                      Send
                    </button>
                  </div>
                  {error && (
                    <p className="left-3 text-red-600 text-sm text-center">
                      {error}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllTaskList;
