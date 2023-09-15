import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../context/Firebase";
import SingleTask from "./SingleTask";
// import { useFirebase } from "../context/Firebase";

function AllTask() {
  const [tasks, setTasks] = useState([]);
  // const firebase = useFirebase();

  useEffect(() => {
    onValue(ref(db, "tasks"), (snapshot) => {
      const data = snapshot.val();
      const arrayOfObjects = Object.values(data);
      // console.log(arrayOfObjects);

      setTasks(arrayOfObjects);
    });
  }, []);
  // console.log(tasks.map((t) => t));
  return (
    <div className="mt-16">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold py-1">All My Tasks</h1>
          <p className="text-gray-500">
            Managing your all tasks is easy with Task Management
          </p>
        </div>
        <Link className="bg-gray-200 hover:bg-gray-300 cursor-pointer h-10 mt-4 flex gap-5 rounded-lg p-2">
          See All Task
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
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-orange-100 p-4 mt-10 rounded-md">
          <div className="flex justify-between mb-6">
            <div className="flex justify-between items-center gap-4 bg-white p-2 rounded-2xl shadow">
              <h4 className="text-orange-600 font-bold">Backlog</h4>
              <div className="bg-orange-500 h-8 w-8 p-1 flex justify-center items-center text-center rounded-full text-white font-bold">
                <p className="">6</p>
              </div>
            </div>
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
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </div>
          <SingleTask tasks={tasks} />
        </div>
        <div className="bg-purple-100 p-4 mt-10 rounded-md">
          <div className="flex justify-between mb-6">
            <div className="flex justify-between items-center gap-4 bg-white p-2 rounded-2xl shadow">
              <h4 className="text-purple-600 font-bold">In Progress</h4>
              <div className="bg-purple-500 h-8 w-8 p-1 flex justify-center items-center text-center rounded-full text-white font-bold">
                <p className="">9</p>
              </div>
            </div>
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
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </div>
          <div className="p-2 bg-white my-2 rounded-md shadow">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 ">Due date : 20-02-2023</p>

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

            <h5 className="text-xl font-bold py-1">Photo Profile Instagram</h5>
            <p className="py-2">
              I want to make a cool photo for instagram. I want to make a cool
              photo for instagram..
            </p>
            <div className="flex text-lg items-center">
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
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <p className="pb-1"> 2</p>
            </div>
          </div>

          <div className="p-2 bg-white my-2 rounded-md shadow">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 ">Due date : 20-02-2023</p>

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

            <h5 className="text-xl font-bold py-1">Photo Profile Instagram</h5>
            <p className="py-2">
              I want to make a cool photo for instagram. I want to make a cool
              photo for instagram..
            </p>
            <div className="flex text-lg items-center">
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
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <p className="pb-1"> 2</p>
            </div>
          </div>
        </div>
        <div className="bg-green-100 p-4 mt-10 rounded-md">
          <div className="flex justify-between mb-6">
            <div className="flex justify-between items-center gap-4 bg-white p-2 rounded-2xl shadow">
              <h4 className="text-green-600 font-bold">Completed</h4>
              <div className="bg-green-500 h-8 w-8 p-1 flex justify-center items-center text-center rounded-full text-white font-bold">
                <p className="">98</p>
              </div>
            </div>
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
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </div>
          <div className="p-2 bg-white my-2 rounded-md shadow">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 ">Due date : 20-02-2023</p>

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

            <h5 className="text-xl font-bold py-1">Photo Profile Instagram</h5>
            <p className="py-2">
              I want to make a cool photo for instagram. I want to make a cool
              photo for instagram..
            </p>
            <div className="flex text-lg items-center">
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
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <p className="pb-1"> 2</p>
            </div>
          </div>
          <div className="p-2 bg-white my-2 rounded-md shadow">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 ">Due date : 20-02-2023</p>

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

            <h5 className="text-xl font-bold py-1">Photo Profile Instagram</h5>
            <p className="py-2">
              I want to make a cool photo for instagram. I want to make a cool
              photo for instagram..
            </p>
            <div className="flex text-lg items-center">
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
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
              <p className="pb-1"> 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTask;
