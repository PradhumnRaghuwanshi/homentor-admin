import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import AdminLayout from "../comp/AdminLayout";

// Mock data for the mentor dashboard

const CallAdmin = () => {
  const [mentorPhone, setMentorPhone] = useState("");
  const [callData, setCallData] = useState([]);
  useEffect(() => {
    fetchCallData();
  }, []);
  function formatDateTime(isoString) {
    const date = new Date(isoString);

    const options = {
      year: "numeric",
      month: "long", // June
      day: "numeric", // 28
      hour: "numeric", // 1–12
      minute: "2-digit",
      hour12: true, // ✅ enables AM/PM
    };

    return date.toLocaleString("en-IN", options);
  }
  const fetchCallData = () => {
    axios
      .get(`https://homentor-backend.onrender.com/api/mentor-call`)
      .then((res) => {
        setCallData(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateNumber = (i) => {
    axios
      .put(`https://homentor-backend.onrender.com/api/mentor-call/${i._id}`, {
        mentorPhone: mentorPhone,
      })
      .then((res) => {
        alert("Number Stored!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Header */}
        <header className="bg-homentor-blue text-white shadow-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/lovable-uploads/fd84ccc3-d993-4d2a-b179-a79cbae53518.png"
                alt="Homentor Logo"
                className="h-8"
              />
              <span className="text-xl font-semibold">Homentor</span>
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Mentor Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Manage your sessions, students, and earnings in one place.
          </p>

          <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-800 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold">S. No.</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Contact Number</th>
                  <th className="px-4 py-3 font-semibold">Time</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {callData.map((i, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{i.name}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`tel:${i.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {i.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      {formatDateTime(i.requestTime)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <input
                          onChange={(e) => setMentorPhone(e.target.value)}
                          placeholder="Enter Number"
                          className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => updateNumber(i)}
                          className=" text-white px-4 py-1 rounded-lg bg-blue-600 transition"
                        >
                          Save
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default CallAdmin;
