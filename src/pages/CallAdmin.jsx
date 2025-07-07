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
      <div className="bg-homentor-blue text-white py-4 px-6 shadow-sm">
        <div className="container-tight flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="mr-8">
              <img
                src="/lovable-uploads/fd84ccc3-d993-4d2a-b179-a79cbae53518.png"
                alt="Homentor Logo"
                className="h-8"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container-tight py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Mentor Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your sessions, students, and earnings in one place.
        </p>

        <table>
          <thead>
            <th>S. no.</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Time</th>
            <th>Action</th>
          </thead>
          <tbody>
            {callData.map((i, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{i.name}</td>
                <td>
                  <a href={`tel:${i.phone}`}>{i.phone}</a>
                </td>
                <td>{formatDateTime(i.requestTime)}</td>
                <td>
                  <div>
                    <input
                      onChange={(e) => setMentorPhone(e.target.value)}
                      placeholder="Enter Number"
                    ></input>
                    <button onClick={() => updateNumber(i)}>Save</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </AdminLayout>
  );
};

export default CallAdmin;
