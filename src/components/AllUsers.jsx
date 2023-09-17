import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import avatar from "../assets/avatar.jpg";
function AllUsers() {
  const { userDb } = useFirebase();
  return (
    <div className="mt-10">
      <h2 className="my-6 text-2xl font-bold ml-6">Team</h2>
      <table className="w-full rounded-md">
        <tbody>
          {userDb &&
            userDb.map((user) => (
              <tr key={user?.uid} className="bg-white rounded-lg shadow">
                <td>
                  <div className="flex items-center space-x-3 px-4 py-1">
                    <img
                      className=" w-12 h-12 rounded-full"
                      src={avatar}
                      alt=" "
                    />
                    <div className="h-12">
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">
                        {user?.designation}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Link
          to="/team"
          className="bg-white cursor-pointer h-10 mt-4 flex gap-5 rounded-lg p-2"
        >
          See All User
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
    </div>
  );
}

export default AllUsers;
