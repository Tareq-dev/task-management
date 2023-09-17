import React from "react";
import { useFirebase } from "../context/Firebase";

function Header() {
  const { tasks } = useFirebase();
  const backlog = tasks?.filter((task) => task?.status === "backlog");
  const complete = tasks?.filter((task) => task?.status === "complete");
  const processing = tasks?.filter((task) => task?.status === "processing");
 
  return (
    <div className="md:flex j">
      <div>
        <h2 className="text-xl">Infromation</h2>
        <div className="flex justify-center md:justify-start items-center gap-4 md:gap-7 mt-6">
          <div className="bg-orange-400 w-[100px] md:w-[165px] text-white rounded-2xl p-2 md:p-6">
            <p className="font-bold text-center text-sm md:text-lg">Backlog</p>
            <div className="flex items-center md:m-2">
              <div className="h-8 border-l-4 pr-2 md:mr-4 mt-3 border-white"></div>
              <h3 className="text-3xl mt-3 md:mt-0 md:text-5xl">
                {backlog.length}
              </h3>
              <p className="md:text-lg mt-6 ml-2">Task</p>
            </div>
          </div>
          <div className="bg-purple-400 w-[100px] md:w-[165px] text-white rounded-2xl p-2 md:p-6">
            <p className="font-bold text-center text-sm md:text-lg">
              Progress
            </p>
            <div className="flex  md:m-2">
              <div className="h-8 border-l-4 mt-3 pr-2 md:mr-4 border-white"></div>
              <h3 className="text-3xl mt-3 md:mt-0 md:text-5xl">
                {processing.length}
              </h3>
              <p className="md:text-lg mt-6 ml-2">Task</p>
            </div>
          </div>
          <div className="bg-green-400 w-[100px] md:w-[165px] text-white rounded-2xl p-2 md:p-6">
            <p className="font-bold text-center text-sm md:text-lg">
              Completed
            </p>
            <div className="flex md:m-2">
              <div className=" h-8 border-l-4 mt-3 pr-2 md:mr-4 border-white"></div>
              <h3 className="text-3xl mt-3 md:mt-0 md:text-5xl">
                {complete.length}
              </h3>
              <p className="md:text-lg mt-6 ml-2">Task</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-8 hidden md:block">
        <h2 className="text-xl">Category Task</h2>
        <div className="flex justify-start items-center gap-7 mt-6">
          <div className="bg-gray-200 text-black rounded-2xl p-6 w-40 h-[140px] flex-col justify-center items-center">
            <p className="">💥💥</p>
            <p className="text-lg flex items-center gap-6">
              Personal
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
            </p>
            <p className=" mt-1 ml-1"> 9 Task</p>
          </div>
          <div className="bg-gray-200 text-black rounded-2xl p-6 w-40 h-[140px] flex-col justify-center items-center">
            <p className="">💻📺</p>
            <p className="text-lg flex items-center gap-6">
              Business
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
            </p>
            <p className=" mt-1 ml-1"> 9 Task</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
