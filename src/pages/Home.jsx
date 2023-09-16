import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import AllTask from "../components/AllTask";
import AllUsers from "../components/AllUsers";

function Home() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="flex">
        <div className="bg-gray-50 p-4 w-3/4">
          <Header />
          <AllTask />
        </div>
        <div className="bg-orange-50 p-4 ml-2 w-1/4">
          <h2 className="text-xl mb-6">Calendar</h2>
          <Calendar />
          <AllUsers />
        </div>
      </div>
    </div>
  );
}

export default Home;
