import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AllUsers from "./components/AllUsers";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./context/Firebase";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    onValue(ref(db, "tasks"), (snapshot) => {
      const data = snapshot.val();
      const arrayOfObjects = Object.values(data);
      setTasks(arrayOfObjects);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  if (loading) return <Loading />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={user} tasks={tasks} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/user" element={<AllUsers />} />
      </Routes>
      <Toaster />
      <ToastContainer />
    </>
  );
}

export default App;
