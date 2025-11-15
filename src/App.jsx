import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import MentorRequest from "./pages/MentorRequest";
import AllMentor from "./pages/AllMentor";
import Setting from "./pages/Setting";
import CallAdmin from "./pages/CallAdmin";
import AllOrders from "./pages/AllOrders";
import AdminBookingsPage from "./pages/AdminBookingsPage";
import AdminMarginRules from "./pages/AdminMarginRules";
CallAdmin

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<AdminDashboard></AdminDashboard>}></Route>
      <Route path="/mentor-request" element={<MentorRequest/>}></Route>
      <Route path="/all-mentor" element={<AllMentor/>}></Route>
      <Route path="/all-orders" element={<AllOrders/>}></Route>
      <Route path="/calling-sheet" element={<CallAdmin/>}></Route>
      <Route path="/setting" element={<Setting/>}></Route>
      <Route path="/class-booking" element={<AdminBookingsPage/>}></Route>
      <Route path="/margin-rules" element={<AdminMarginRules/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
