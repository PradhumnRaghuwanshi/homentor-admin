// AllMentorCard.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminLayout from "../comp/AdminLayout";
import MentorEditModal from "../comp/MentorEditModal";

const AllMentor = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  useEffect(() => {
    getMentorData();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [mentorList, setMentorList] = useState([]);
  const getMentorData = () => {
    axios
      .get("https://homentor-backend.onrender.com/api/mentor/approved-mentors")
      .then((res) => {
        setMentorList(res.data.data.reverse());
      });
  };

  const [isAdminRank, setIsAdminRank] = useState(false);
  const handleAdminRanking = (mentorId, rank) => {
    axios
      .put(`https://homentor-backend.onrender.com/api/mentor/${mentorId}`, {
        adminRanking: rank,
      })
      .then((res) => {
        alert("User Status Updated");
        getMentorData();
      });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [isPriceEditing, setIsPriceEditing] = useState(false);
  const [price, setPrice] = useState();
  const [isModified, setIsModified] = useState(false);
  const handleSave = (mentor) => {
    axios
      .put(`https://homentor-backend.onrender.com/api/mentor/${mentor._id}`, {
        teachingModes: {
          homeTuition: {
            monthlyPrice: price,
          },
        },
      })
      .then((res) => {
        getMentorData();
        setIsPriceEditing(false);
        setIsModified(false);
      });
  };
  const [editData, setEditData] = useState({ ...selectedMentor });
  const updateField = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    // 🔄 Make an API call here to save `editData`
    console.log("Updated Data:", editData);
    setSelectedMentor(editData);
    setIsEditing(false);
  };

  const handleToggle = (mentor) => {
    try {
      axios
        .put(`https://homentor-backend.onrender.com/api/mentor/${mentor._id}`, {
          showOnWebsite: !mentor.showOnWebsite,
        })
        .then(() => {
          alert("Mentor Updated");
          getMentorData();
        });
    } catch (error) {
      console.error("Failed to update visibility:", error);
    }
  };
  const [shareList, setShareList] = useState([]);
  const link =
    "https://homentor.onrender.com/selected-mentors?id=" + shareList.join(",");

   const handleStatus = (mentorId, status) => {
    axios
      .put(`https://homentor-backend.onrender.com/api/mentor/${mentorId}`, {
        status: status,
      })
      .then((res) => {
        alert("User Status Updated");
        getMentorData();
      });
  };
  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          All Approved Mentors
        </h2>
        {shareList.length ? (
          <button
            className="w-[200px] m-1  mb-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow transition duration-200 active:scale-95"
            style={{ width: 200 }}
            onClick={() => navigator.clipboard.writeText(link)}
          >
            Copy Share Link
          </button>
        ) : null}
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">S.no</th>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Name & Phone</th>
                <th className="px-4 py-3">Ranking</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Display</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mentorList.map((mentor, index) => (
                <tr key={mentor._id} className="hover:bg-gray-50 border-t">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={mentor.profilePhoto}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <input
                      onClick={() => {
                        if (shareList.includes(mentor._id)) {
                          setShareList(
                            shareList.filter((i) => i._id !== mentor._id)
                          );
                        } else {
                          setShareList([...shareList, mentor._id]);
                        }
                      }}
                      type="checkbox"
                    />
                    <div>
                      <div className="font-medium">{mentor.fullName}</div>
                      <div className="text-gray-500 text-xs">
                        {mentor.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1 text-center">
                      <select
                        onChange={(e) =>
                          handleAdminRanking(mentor._id, e.target.value)
                        }
                        value={mentor.adminRanking || ""}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option disabled value="">
                          Set Rank
                        </option>
                        {[...Array(10)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <div className="flex justify-center gap-0.5 pt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill={
                              star <= mentor?.rating ? "#facc15" : "#e5e7eb"
                            }
                            className="w-5 h-5"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.286 3.975c.3.921-.755 1.688-1.538 1.118L10 14.347l-3.39 2.463c-.783.57-1.838-.197-1.539-1.118l1.287-3.975a1 1 0 00-.364-1.118L2.605 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.951-.69l1.286-3.975z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm cursor-pointer">
                    {isPriceEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className="w-24 border rounded px-2 py-1 text-sm"
                          value={price}
                          onChange={(e) => {
                            setPrice(e.target.value);
                            setIsModified(true);
                          }}
                        />
                        {isModified && (
                          <button
                            onClick={() => {handleSave(mentor);setPrice(mentor?.teachingModes?.homeTuition?.monthlyPrice)}}
                            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                          >
                            Update
                          </button>
                        )}
                      </div>
                    ) : (
                      <span onClick={() => setIsPriceEditing(true)}>
                        ₹
                        {mentor?.teachingModes?.homeTuition?.monthlyPrice ||
                          "--"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div>{mentor.location?.area}</div>
                    <div className="text-xs text-gray-500">
                      {mentor.location?.city}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggle(mentor)}
                      className={`w-12 h-6 rounded-full p-1 flex items-center transition ${
                        mentor.showOnWebsite ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                          mentor.showOnWebsite
                            ? "translate-x-6"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 flex gap-2 text-xs">
                    <button
                      onClick={() => setSelectedMentor(mentor)}
                      className="px-2 py-1 text-blue-600 hover:underline"
                    >
                      View
                    </button>
                    
                    <button
                      onClick={() => handleStatus(mentor._id, "Rejected")}
                      className="px-2 py-1 text-red-600 hover:underline"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* You already have a nice modal; just ensure these: */}
        {selectedMentor && (
          <MentorEditModal
            getMentorData={getMentorData}
            onSave={handleSaveEdit}
            selectedMentor={selectedMentor}
            setSelectedMentor={setSelectedMentor}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default AllMentor;
