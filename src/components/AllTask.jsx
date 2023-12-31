import React from "react";
import { Link } from "react-router-dom";
import Complete from "./Complete";
import Processing from "./Processing";
import Backlog from "./Backlog";
import { useFirebase } from "../context/Firebase";

function AllTask() {
  const { tasks } = useFirebase();
  const backlog = tasks?.filter((task) => task?.status === "backlog");
  const complete = tasks?.filter((task) => task?.status === "complete");
  const processing = tasks?.filter((task) => task?.status === "processing");

  return (
    <div className="mt-16">
      <div className="md:flex justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold py-1">All Tasks</h1>
          <p className="text-gray-500 text-sm  md:text-lg">
            Managing your all tasks is easy with Task Management
          </p>
        </div>
        <Link
          to="/all-task"
          className="bg-gray-200 hidden    md:text-lg hover:bg-gray-300 cursor-pointer h-10 mt-4 md:flex gap-5 rounded-lg p-2"
        >
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
      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-orange-100 p-4 mt-10 rounded-md">
          <div className="flex justify-between mb-4">
            <div className="flex justify-between items-center gap-4 bg-white p-2 rounded-md shadow">
              <h4 className="text-orange-600 font-bold">Backlog</h4>
              <div className="bg-orange-500 h-8 w-8 p-1 flex justify-center items-center text-center rounded-full text-white font-bold">
                <p className="">{backlog?.length}</p>
              </div>
            </div>
          </div>
          <Backlog tasks={tasks} />
        </div>
        <div className="bg-purple-100 p-4 mt-10 rounded-md">
          <div className="flex justify-between mb-6">
            <div className="flex justify-between items-center gap-4 bg-white p-2 rounded-md shadow">
              <h4 className="text-purple-600 font-bold">In Progress</h4>
              <div className="bg-purple-500 h-8 w-8 p-1 flex justify-center items-center text-center rounded-full text-white font-bold">
                <p className="">{processing.length}</p>
              </div>
            </div>
          </div>
          <Processing tasks={tasks} />
        </div>
        <div className="bg-green-100 p-4 mt-10 rounded-md">
          <div className="flex justify-between mb-6">
            <div className="flex justify-between items-center gap-4 bg-white p-2 rounded-md shadow">
              <h4 className="text-green-600 font-bold">Completed</h4>
              <div className="bg-green-500 h-8 w-8 p-1 flex justify-center items-center text-center rounded-full text-white font-bold">
                <p className="">{complete.length}</p>
              </div>
            </div>
          </div>
          <Complete tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default AllTask;
