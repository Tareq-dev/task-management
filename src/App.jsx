import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AllUsers from "./components/AllUsers";
import  { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<AllUsers />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
