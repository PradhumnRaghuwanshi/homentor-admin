// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../comp/AdminLayout";
import {
  Users,
  Bed,
  FileWarning,
  IndianRupee,
  ScrollText,
  Activity,
} from "lucide-react";
import axios from "axios";


export default function AdminDashboard() {
  useEffect(()=>{getMentorData()}, [])
  const [roomData, setRoomData] = useState([]);
  

  const [tenantData, setTenantData] = useState([])
 

  const [expenseData, setExpenseData] = useState([])
  
  const [mentorList, setMentorList] = useState([]);
  const getMentorData = () => {
    axios
      .get("https://homentor-backend.onrender.com/api/mentor")
      .then((res) => {
        setMentorList(res.data.data);
      });
  };

  const stats = [
    {
      label: "Total Mentor",
      value: mentorList.length,
      icon: Users,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Total Rooms",
      value: roomData.length,
      icon: Users,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Rooms Occupied",
      value: roomData.filter((i)=> i.alloted == true).length,
      icon: Bed,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Total Rent",
      value: `₹${roomData.filter((i)=> i?.currentRentStatus?.totalRent).map((i)=> i?.currentRentStatus?.totalRent).reduce((a,b)=> a+b, 0)}`,
      icon: FileWarning,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      label: "Rent Collected",
      value: `₹${roomData.filter((i)=> i?.currentRentStatus?.totalRent).map((i)=> i.currentRentStatus.rentPaid ? i.currentRentStatus.rentPaid : 0 ).reduce((a,b)=> a+b, 0)}`,
      icon: IndianRupee,
      color: "text-purple-600 bg-purple-100",
    },
  ];
  
  
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-10 px-4 sm:px-4 lg:px-4 py-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300 border-t-4 border-transparent hover:border-blue-400"
            >
              <div className={`w-fit p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 lg:h-7 lg:w-7" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 tracking-wide">{stat.label}</p>
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 tracking-tight leading-tight">
                  {stat.value}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Activity + Notices */}
        {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="text-blue-700 text-lg font-semibold flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5" /> Recent Activity
            </h3>
            <ul className="text-sm text-gray-700 space-y-4 leading-relaxed">
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-1">🧍 <b>Priya Jain</b> submitted a complaint</span>
                <span className="text-xs text-gray-400">2 min ago</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-1">🏠 <b>Room 201</b> marked vacant</span>
                <span className="text-xs text-gray-400">10 min ago</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-1">💳 Rent received from <b>Aman</b></span>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-1">📢 Rule updated: <b>No visitors after 9PM</b></span>
                <span className="text-xs text-gray-400">2 hrs ago</span>
              </li>
            </ul>
          </div>

          <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="text-blue-700 text-lg font-semibold flex items-center gap-2 mb-4">
              <ScrollText className="h-5 w-5" /> Latest Notices
            </h3>
            <ul className="text-sm text-gray-700 space-y-4 leading-relaxed">
              <li className="border-l-4 border-blue-500 pl-3">
                🚱 Water supply will be disrupted from 10AM–1PM.
              </li>
              <li className="border-l-4 border-yellow-500 pl-3">
                ⚡ Electricity maintenance on Sunday.
              </li>
              <li className="border-l-4 border-green-500 pl-3">
                🍽️ Mess holiday on Holi (March 8).
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </AdminLayout>
  );
}