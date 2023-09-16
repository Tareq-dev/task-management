import React from "react";
import { useFirebase } from "../context/Firebase";
import Navbar from "./Navbar";

function Team() {
  const { userDb } = useFirebase();
  return (
    <div>
      <Navbar />
      <div className="mt-24 flex justify-center">
        <div className="overflow-x-auto w-1/2 ">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {userDb &&
                userDb.map((u, i) => (
                  <tr key={u.uid}>
                    <th>{i + 1}</th>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>Frontend Developer</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Team;
