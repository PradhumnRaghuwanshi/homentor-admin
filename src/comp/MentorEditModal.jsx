// A complete editable React Modal for updating mentor details
import axios from "axios";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import TeachingPreferenceMatrix from "./TeachingPreferenceMatrix";
import TeachingModesDisplay from "./TeachingModesDisplay";

const MentorEditModal = ({
  selectedMentor,
  setSelectedMentor,
  onSave,
  getMentorData = { getMentorData },
}) => {
  const [isEditing, setIsEditing] = useState(false);
  console.log(selectedMentor);
  const updateField = (fieldPath, value) => {
    setSelectedMentor((prev) => {
      const updated = { ...prev };
      const keys = fieldPath.split(".");
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");

  const handleSaveEdit = () => {
    setIsEditing(false);
    onSave(selectedMentor);
  };

  const handleUpdate = () => {
    axios
      .put(
        `https://homentor-backend.onrender.com/api/mentor/${selectedMentor._id}`,
        selectedMentor
      )
      .then((res) => {
        getMentorData();
        setSelectedMentor(undefined);
        setIsEditing(false);
        alert("User Status Updated");
      });
  };
  return (
    selectedMentor && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedMentor(null)}
        ></div>

        <div className="relative z-10 bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-blue-600">Mentor Details</h2>
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSaveEdit}
                  className="text-sm bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
              )}
              <button
                onClick={() => setSelectedMentor(null)}
                className="text-gray-600 hover:text-gray-800 text-xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                Basic Info
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMentor?.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMentor?.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMentor?.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMentor?.gender}
                    onChange={(e) => updateField("gender", e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="Age"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMentor?.age}
                    onChange={(e) => updateField("age", Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50  flex items-center justify-center">
                <div className="absolute w-[100%] h-[100vh] bg-black opacity-50"></div>
                <div className="bg-white rounded-lg p-4 max-w-md w-full shadow-lg relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  >
                    ✕
                  </button>
                  <img
                    src={modalImg}
                    alt="Enlarged Profile"
                    className="w-full max-h-[80vh] object-contain rounded"
                  />
                </div>
              </div>
            )}
            <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                Documents & Media
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Profile Photo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      {selectedMentor?.profilePhoto ? (
                        <div>
                          <img
                            src={selectedMentor?.profilePhoto}
                            alt="Profile"
                            className=" h-16  object-cover border"
                          />
                          <button
                            onClick={() => {
                              setModalImg(selectedMentor?.profilePhoto);
                              setIsModalOpen(true);
                            }}
                            className="text-blue-600 underline text-sm"
                          >
                            View Photo
                          </button>
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                          No Photo
                        </div>
                      )}
                    </div>
                    <label
                      className="cursor-pointer hover:text-blue-600"
                      title="Upload Photo"
                    >
                      <FiUploadCloud size={22} title="Upload Photo" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("profilePhoto", e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* ID Document */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Govt ID (PDF/Image)
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border">
                    {selectedMentor?.mentorId ? (
                      <div>
                        <img
                          src={selectedMentor?.mentorId}
                          alt="MentorID"
                          className="h-16 object-cover border"
                        />
                        <button
                          onClick={() => {
                            setModalImg(selectedMentor?.mentorId);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 underline text-sm"
                        >
                          View Photo
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No ID</span>
                    )}
                    <label
                      className="cursor-pointer hover:text-blue-600"
                      title="Upload ID"
                    >
                      <FiUploadCloud size={22} title="Upload Photo" />
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileUpload("mentorId", e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* CV / Resume */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CV / Resume (PDF)
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border">
                    {selectedMentor?.cv ? (
                      <button
                        onClick={() => {
                          setModalImg(selectedMentor?.mentorId);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 underline text-sm"
                      >
                        View Photo
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500">
                        No file uploaded
                      </span>
                    )}
                    <label
                      className="cursor-pointer hover:text-blue-600"
                      title="Upload CV"
                    >
                      <FiUploadCloud size={22} title="Upload Photo" />
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileUpload("cv", e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Teaching Video */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teaching Demo Video (MP4)
                  </label>
                  <div className="flex flex-col space-y-2 bg-gray-50 p-2 rounded-lg border">
                    {selectedMentor?.teachingVideo ? (
                      <video
                        src={selectedMentor?.teachingVideo}
                        controls
                        className="w-full rounded-md border max-h-48"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        No video uploaded
                      </span>
                    )}
                    <label
                      className="flex items-center space-x-1 text-sm text-gray-600 cursor-pointer hover:text-blue-600"
                      title="Upload Video"
                    >
                      <span>
                        {" "}
                        <FiUploadCloud size={22} title="Upload Photo" />
                      </span>
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="video/mp4"
                        onChange={(e) => handleFileUpload("teachingVideo", e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                Qualifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {/* Highest Qualification */}
                <div className="flex items-center gap-4">
                  <label className="block text-sm font-medium  text-gray-700 mb-1">
                    Display Qualification
                  </label>
                  <input
                    type="checkbox"
                    className=" border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    checked={selectedMentor?.qualifications?.display}
                    onChange={(e) =>
                      updateField(
                        "qualifications.display",
                        !selectedMentor?.qualifications?.display
                      )
                    }
                    placeholder="e.g., M.Tech, B.Sc, MBA"
                  />
                </div>
                {/* Highest Qualification */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Graduation Degree
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMentor?.graduation?.degree}
                    onChange={(e) =>
                      updateField("graduation.degree", e.target.value)
                    }
                    placeholder="e.g., M.Tech, B.Sc, MBA"
                  />
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    College
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMentor?.graduation?.college}
                    onChange={(e) =>
                      updateField(
                        "qualifications.specialization",
                        e.target.value
                      )
                    }
                    placeholder="e.g., Computer Science, Marketing"
                  />
                </div>

                {/* University */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Post Graduation Degree
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMentor?.postGraduation?.degree}
                    onChange={(e) =>
                      updateField("postGraduation.degree", e.target.value)
                    }
                    placeholder="e.g., Delhi University"
                  />
                </div>

                {/* Graduation Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    College
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMentor?.postGraduation?.graduationYear}
                    onChange={(e) =>
                      updateField("postGraduation.college", e.target.value)
                    }
                  />
                </div>

                {/* Teaching Experience */}
                <div className="flex items-center gap-3">
                  <input
                    checked={selectedMentor?.experienceDisplay}
                    type="checkbox"
                    onClick={() => {
                      setSelectedMentor({
                        ...selectedMentor,
                        experienceDisplay: !selectedMentor?.experienceDisplay,
                      });
                    }}
                  ></input>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teaching Experience
                  </label>
                  <input
                    className=" border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMentor?.experience}
                    onChange={(e) => updateField("experience", e.target.value)}
                    placeholder="e.g., 3 years"
                  />
                </div>
              </div>
            </div>
            <TeachingModesDisplay
              mentorData={selectedMentor}
              setSelectedMentor={setSelectedMentor}
            />
            <div className="bg-white p-4 rounded-2xl shadow-sm mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Teacher Ratings
              </h3>

              {/* In-House Mentor */}
              <div className="flex items-center gap-3">
                <input
                  id="inHouse"
                  type="checkbox"
                  checked={selectedMentor?.inHouse}
                  onChange={() =>
                    setSelectedMentor({
                      ...selectedMentor,
                      inHouse: !selectedMentor?.inHouse,
                    })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="inHouse" className="text-sm text-gray-700">
                  In-House Mentor
                </label>
              </div>

              {/* Rating */}
              <div className="space-y-1">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Review Rating (1 - 5)
                </label>
                <input
                  type="number"
                  id="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={selectedMentor?.rating || ""}
                  onChange={(e) =>
                    setSelectedMentor({
                      ...selectedMentor,
                      rating: parseFloat(e.target.value),
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter rating (e.g., 4.5)"
                />
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    onClick={() =>
                      setSelectedMentor({
                        ...selectedMentor,
                        adminBriefVisible: false,
                      })
                    }
                    checked={selectedMentor?.adminBriefVisible ? false : true}
                  ></input>
                  <label
                    htmlFor="brief"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Brief
                  </label>
                </div>

                <textarea
                  type="text"
                  id="brief"
                  value={selectedMentor?.brief || ""}
                  onChange={(e) =>
                    setSelectedMentor({
                      ...selectedMentor,
                      brief: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mentor Brief"
                />
              </div>

              {/*teachingExperience */}
              <div className="space-y-1">
                <div className="flex gap-2 items-center">
                  <label
                    htmlFor="teachingExperience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Teaching Brief
                  </label>
                </div>

                <textarea
                  type="text"
                  id="teachingExperience"
                  value={selectedMentor?.teachingExperience || ""}
                  onChange={(e) =>
                    setSelectedMentor({
                      ...selectedMentor,
                      teachingExperience: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Admin - Mentor Bio"
                />
              </div>
              <div className="space-y-1">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    onClick={() =>
                      setSelectedMentor({
                        ...selectedMentor,
                        adminBriefVisible: true,
                      })
                    }
                    checked={selectedMentor?.adminBriefVisible ? true : false}
                  ></input>
                  <label
                    htmlFor="adminBrief"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Admin - Brief
                  </label>
                </div>

                <textarea
                  type="text"
                  id="adminBrief"
                  value={selectedMentor?.adminBrief || ""}
                  onChange={(e) =>
                    setSelectedMentor({
                      ...selectedMentor,
                      adminBrief: e.target.value,
                    })
                  }
                  className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Admin - Mentor Bio"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
                Location
              </h3>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="area"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Area / Locality
                  </label>
                  <input
                    type="text"
                    id="area"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="e.g., Tilak Nagar"
                    value={selectedMentor?.location?.area || ""}
                    onChange={(e) =>
                      updateField("location.area", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="e.g., Indore"
                    value={selectedMentor?.location?.city || ""}
                    onChange={(e) =>
                      updateField("location.city", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="e.g., Madhya Pradesh"
                    value={selectedMentor?.location?.state || ""}
                    onChange={(e) =>
                      updateField("location.state", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="teachingRange"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Teaching Range (km)
                  </label>
                  <input
                    type="text"
                    id="teachingRange"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="e.g., 3 km"
                    value={selectedMentor?.teachingRange || ""}
                    onChange={(e) =>
                      updateField("teachingRange", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Available Days */}
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Available Days
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <label
                      key={day}
                      className="flex items-center text-sm gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMentor?.availableDays?.includes(day)}
                        onChange={(e) => {
                          const updatedDays = e.target.checked
                            ? [...(selectedMentor?.availableDays || []), day]
                            : selectedMentor?.availableDays?.filter(
                                (d) => d !== day
                              );
                          updateField("availableDays", updatedDays);
                        }}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Teaching Preference */}
          </div>
          <TeachingPreferenceMatrix
            selectedMentor={selectedMentor}
            updateField={(field, value) =>
              setSelectedMentor((prev) => ({ ...prev, [field]: value }))
            }
          />
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setSelectedMentor(null)}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Close
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default MentorEditModal;
