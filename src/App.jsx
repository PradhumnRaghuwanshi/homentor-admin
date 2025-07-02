import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import MentorRequest from "./pages/MentorRequest";
import AllMentor from "./pages/AllMentor";
import Setting from "./pages/Setting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<AdminDashboard></AdminDashboard>}></Route>
      <Route path="/mentor-request" element={<MentorRequest/>}></Route>
      <Route path="/all-mentor" element={<AllMentor/>}></Route>
      <Route path="/setting" element={<Setting/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
