import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../comp/AdminLayout";
import DirectBookingForm from "../comp/DirectBookingForm";
import DemoControlPanel from "../comp/DemoControlPanel";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "https://homentor-backend.onrender.com/api/class-bookings"
      );
      setBookings(response.data.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

   const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      await axios.delete(`https://homentor-backend.onrender.com/api/class-bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking");
    }
  };

   const getStatusStyle = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-800";
      case "pending_schedule":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📚 All Bookings</h1>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          ➕ Book Class
        </button>
      </div>

      <DemoControlPanel></DemoControlPanel>

      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto w-full bg-white rounded-lg shadow-md border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Mentor</th>
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">School</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
                 <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b">
                  <td className="px-4 py-2">{b.mentor?.fullName || "N/A"}</td>
                  <td className="px-4 py-2">{b.studentName}</td>
                  <td className="px-4 py-2">{b.class}</td>
                  <td className="px-4 py-2">{b.school}</td>
                  <td className="px-4 py-2">{b.subject}</td>
                  <td className="px-4 py-2">
                    {b.scheduledDate
                      ? new Date(b.scheduledDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2">{b.scheduledTime || "N/A"}</td>
                  <td className="px-4 py-2">{b.duration || "N/A"}</td>
                  <td className="px-4 py-2">₹{b.price}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        b.status
                      )}`}
                    >
                      {b.status}
                    </span>
                  </td>
                   <td className="px-3 py-2">
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal for Booking Form */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
          <div className="bg-black opacity-50 absolute w-full h-[100vh]"></div>  
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            {/* Direct Booking Form */}
            <DirectBookingForm />
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}
