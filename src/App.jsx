import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";


const App = () => {
  return (
 
    <Routes>
        
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;