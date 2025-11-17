import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../comp/AdminLayout";
import DirectBookingForm from "../comp/DirectBookingForm";
import DemoControlPanel from "../comp/DemoControlPanel";
import ClassRecordView from "../comp/ClassRecordView";
import { Badge } from "lucide-react";

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
      await axios.delete(
        `https://homentor-backend.onrender.com/api/class-bookings/${id}`
      );
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking");
    }
  };

  // ------------ ADMIN APPROVE TOGGLE --------------
  const handleAdminApprove = async (id, checked) => {
    try {
      const res = await axios.post(
        `https://homentor-backend.onrender.com/api/class-bookings/${id}/admin-approve`,
        { approved: checked }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, adminApproved: checked } : b
        )
      );
    } catch (err) {
      alert("Failed to update approval");
    }
  };

  // ------------ PARENT COMPLETION -----------------
  const handleParentToggle = async (id) => {
    try {
      const res = await axios.post(
        `https://homentor-backend.onrender.com/api/class-bookings/${id}/parent-complete`
      );

      fetchBookings(); // refresh state
    } catch (err) {
      alert(err?.response?.data?.message || "Error updating parent status");
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

        <DemoControlPanel />

        {loading ? (
          <p className="text-gray-500">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto w-full bg-white rounded-lg shadow-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Booking ID</th>
                  <th className="px-4 py-2">Mentor</th>
                  <th className="px-4 py-2">Student</th>
                  <th className="px-4 py-2">Classes Done</th>
                  <th className="px-4 py-2">Fees</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Approve</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b">

                    {/* Booking ID + Parent Approved badge */}
                    <td className="px-4 py-2 font-mono text-xs flex flex-col gap-1">
                      {b._id}

                      {b.parentCompletion && (
                        <span className="text-green-600 text-[10px] font-semibold bg-green-100 px-2 py-[2px] rounded">
                          Parent Approved
                        </span>
                      )}
                    </td>

                    {/* Mentor Name + Phone */}
                    <td className="px-4 py-2 text-xs">
                      <div className="font-semibold">{b.mentor?.fullName}</div>
                      <div className="text-green-600 text-[10px] bg-green-100 px-2 py-[2px] rounded w-fit">
                        {b.mentor?.phone}
                      </div>
                    </td>

                    {/* Student Name */}
                    <td className="px-4 py-2 flex flex-col text-xs">
                      <span className="font-semibold">{b.studentName || "N/A"}</span>

                      <span className="text-blue-600 bg-blue-100 px-2 py-[2px] rounded w-fit text-[10px] mt-1">
                        {b.parent?.phone || "N/A"}
                      </span>
                    </td>

                    {/* Classes Completed */}
                    <td className="px-4 py-2">
                      <label>{(b.progress || 0)} / {b.duration || 22}</label>
                      {/* Demo Badge */}
                      {b.isDemo && (
                        <Badge className="bg-purple-100 text-purple-700 border border-purple-300 ml-2">
                          Demo
                        </Badge>
                      )}
                      <br></br>
                      <ClassRecordView classBooking={b} />

                    </td>

                    {/* Fees */}
                    <td className="px-4 py-2">
                      <label className={`${b.progress == b.duration ? "text-green-600" : "text-orange-600"}`}>
                        ₹{((b.mentor.teachingModes.homeTuition.monthlyPrice / 22) * b.progress).toFixed(0)}
                      </label>
                      /
                      ₹{b.mentor.teachingModes.homeTuition.monthlyPrice + b.mentor.teachingModes.homeTuition.margin}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>

                    {/* Admin Approve Checkbox */}
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={b.adminApproved || false}
                        onChange={(e) =>
                          handleAdminApprove(b._id, e.target.checked)
                        }
                      />
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => alert("Open booking view modal")}
                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        View
                      </button>


                      <button
                        onClick={() => handleDelete(b._id)}
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black opacity-50 absolute w-full h-full"></div>
            <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-lg">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <DirectBookingForm />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
