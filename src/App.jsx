import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AllUsers from "./components/AllUsers";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/user" element={<AllUsers />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
