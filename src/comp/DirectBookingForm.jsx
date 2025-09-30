import { useState, useEffect } from "react";
import axios from "axios";

export default function DirectBookingForm() {
  const [parents, setParents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [formData, setFormData] = useState({
    parentId: "",
    mentorId: "",
    subject: "",
    className: "",
    school: "",
    date: "",
    time: "",
    duration: "",
    amount: "",
    paymentMode: "cash",
  });

  useEffect(() => {
    axios.get("https://homentor-backend.onrender.com/api/mentor/approved-mentors").then((res) => setMentors(res.data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/class-bookings/admin-direct", formData);
      alert("Class booked successfully!");
      setFormData({
        parentId: "",
        mentorId: "",
        subject: "",
        className: "",
        school: "",
        date: "",
        time: "",
        duration: "",
        amount: "",
        paymentMode: "cash",
        phone: ""
      });
    } catch (err) {
      console.error(err);
      alert("Failed to book class");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Direct Class Booking</h2>

      {/* Student */}
      <input
        type="text"
        placeholder="Student Name"
        value={formData.studentName}
        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      />
      

      {/* Mentor */}
      <select
        value={formData.mentorId}
        onChange={(e) => setFormData({ ...formData, mentorId: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Mentor</option>
        {mentors?.map((m) => (
          <option key={m._id} value={m._id}>
            {m.fullName}
          </option>
        ))}
      </select>

      {/* Phone Number */}
      <input
        type="text"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      />

      {/* Subject */}
      <input
        type="text"
        placeholder="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      />

      {/* Class */}
      <input
        type="text"
        placeholder="Class"
        value={formData.className}
        onChange={(e) => setFormData({ ...formData, className: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      />

      {/* School */}
      <input
        type="text"
        placeholder="School"
        value={formData.school}
        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      />

      {/* Date */}
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      />

      {/* Time */}
      <input
        type="time"
        value={formData.time}
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      />

      {/* Duration */}
      <input
        type="text"
        placeholder="Duration (e.g., 1 hour)"
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      />

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Book Class (Cash)
      </button>
    </form>
  );
}
