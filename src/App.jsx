import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AllUsers from "./components/AllUsers";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Team from "./components/Team";
import AllTaskList from "./pages/AllTaskList";
import Edit from "./components/Edit";

function App() {
  return (
    <>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editted" element={<Edit />} />
          <Route path="/all-task" element={<AllTaskList />} />
          <Route path="/team" element={<Team />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/user" element={<AllUsers />} />
        </Routes>
        <Toaster />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
