import React from "react";

function Header() {
  return (
    <div className="flex ">
      <div>
        <h2 className="text-xl">Infromation</h2>
        <div className="flex justify-start items-center gap-7 mt-6">
          <div className="bg-orange-400 text-white rounded-2xl p-6">
            <p className="font-bold">Backlog</p>
            <div className="flex m-2">
              <div className="h-8 border-l-4 mr-4 mt-3 border-white"></div>
              <h3 className="text-5xl">9</h3>
              <p className="text-lg mt-6 ml-2">Task</p>
            </div>
          </div>
          <div className="bg-purple-400 text-white rounded-2xl p-6">
            <p className="font-bold">In Progress</p>
            <div className="flex m-2">
              <div className="h-8 border-l-4 mt-3 mr-4 border-white"></div>
              <h3 className="text-5xl">4</h3>
              <p className="text-lg mt-6 ml-2">Task</p>
            </div>
          </div>
          <div className="bg-green-400 text-white rounded-2xl p-6">
            <p className="font-bold">Completed</p>
            <div className="flex m-2">
              <div className="h-8 border-l-4 mt-3 mr-4 border-white"></div>
              <h3 className="text-5xl">16</h3>
              <p className="text-lg mt-6 ml-2">Task</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-12">
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
