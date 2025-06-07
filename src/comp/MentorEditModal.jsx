// A complete editable React Modal for updating mentor details
import React, { useState } from "react";

const MentorEditModal = ({ selectedMentor, setSelectedMentor, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  //   const [selectedMentor, setEditData] = useState({ ...selectedMentor });

  const updateField = (fieldPath, value) => {
    setEditData((prev) => {
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

  const toggleAvailableDay = (day) => {
    setEditData((prev) => {
      const updatedDays = prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day];
      return { ...prev, availableDays: updatedDays };
    });
  };

  const updateTeachingMode = (mode, selected) => {
    setEditData((prev) => {
      const modes = { ...prev.teachingModes };
      if (!modes[mode]) modes[mode] = { selected: false, monthlyPrice: 0 };
      modes[mode].selected = selected;
      return { ...prev, teachingModes: modes };
    });
  };

  const updateTeachingPrice = (mode, price) => {
    setEditData((prev) => {
      const modes = { ...prev.teachingModes };
      modes[mode].monthlyPrice = Number(price);
      return { ...prev, teachingModes: modes };
    });
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    onSave(selectedMentor);
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const allSubjects = [
    "Mathematics",
    "English",
    "Hindi",
    "Science",
    "Social Science",
    "Computer Science",
  ];

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">Basic Info </h3>
              <div className="space-y-2">
                <input
                  className="w-full border px-2 py-1"
                  value={selectedMentor.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                />
                <input
                  className="w-full border px-2 py-1"
                  value={selectedMentor.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
                <input
                  className="w-full border px-2 py-1"
                  value={selectedMentor.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
                <select
                  className="w-full border px-2 py-1"
                  value={selectedMentor.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="number"
                  className="w-full border px-2 py-1"
                  value={selectedMentor.age}
                  onChange={(e) => updateField("age", Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Qualifications</h3>
              <input
                className="w-full border px-2 py-1"
                value={selectedMentor.qualifications?.highestQualification}
                onChange={(e) =>
                  updateField(
                    "qualifications.highestQualification",
                    e.target.value
                  )
                }
              />
              <input
                className="w-full border px-2 py-1"
                value={selectedMentor.qualifications?.specialization}
                onChange={(e) =>
                  updateField("qualifications.specialization", e.target.value)
                }
              />
              <input
                className="w-full border px-2 py-1"
                value={selectedMentor.qualifications?.university}
                onChange={(e) =>
                  updateField("qualifications.university", e.target.value)
                }
              />
              <input
                type="number"
                className="w-full border px-2 py-1"
                value={selectedMentor.qualifications?.graduationYear}
                onChange={(e) =>
                  updateField(
                    "qualifications.graduationYear",
                    Number(e.target.value)
                  )
                }
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Teacher Ratings</h3>
              <div className="flex gap-2 items-center">
                <input
                  checked={selectedMentor.inHouse}
                  onClick={() =>
                    setSelectedMentor({
                      ...selectedMentor,
                      inHouse: !selectedMentor.inHouse,
                    })
                  }
                  type="checkbox"
                  className=" border px-2 py-1"
                  value={selectedMentor.qualifications?.highestQualification}
                  onChange={(e) =>
                    updateField(
                      "qualifications.highestQualification",
                      e.target.value
                    )
                  }
                />
                <label>In - House Mentor</label>
              </div>
              <div>
                <label>Review(Rating)</label>
                <input onChange={(e)=> setSelectedMentor({...selectedMentor, })}></input>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              <input
                className="w-full border px-2 py-1"
                value={selectedMentor.location?.area}
                onChange={(e) => updateField("location.area", e.target.value)}
              />
              <input
                className="w-full border px-2 py-1"
                value={selectedMentor.location?.city}
                onChange={(e) => updateField("location.city", e.target.value)}
              />
              <input
                className="w-full border px-2 py-1"
                value={selectedMentor.location?.state}
                onChange={(e) => updateField("location.state", e.target.value)}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Teaching Info</h3>
              <select
                className="w-full border px-2 py-1"
                value={selectedMentor.experience}
                onChange={(e) => updateField("experience", e.target.value)}
              >
                <option value="0-1">0-1</option>
                <option value="1-3">1-3</option>
                <option value="3+">3+</option>
              </select>
              <input
                className="w-full border px-2 py-1"
                value={selectedMentor.teachingRange}
                onChange={(e) => updateField("teachingRange", e.target.value)}
              />
              {/* { Object.entries(selectedMentor.teachingModes).map(([mode, data]) => (
                <div key={mode} className="flex items-center gap-2">
                  <input type="checkbox" checked={data.selected} onChange={(e) => updateTeachingMode(mode, e.target.checked)} />
                  <span>{mode}</span>
                  {data.selected && (
                    <input
                      type="number"
                      className="border px-1 py-0.5 w-24"
                      value={data.monthlyPrice}
                      onChange={(e) => updateTeachingPrice(mode, e.target.value)}
                    />
                  )}
                </div>
              ))} */}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Availability</h3>
              <div className="flex flex-wrap gap-2">
                {days.map((day) => (
                  <label key={day} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      //   checked={selectedMentor.availableDays.includes(day)}
                      onChange={() => toggleAvailableDay(day)}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2">Teaching Preferences</h3>
              {/* {Object.entries(selectedMentor.teachingPreferences.school).map(([className, subjects]) => (
                <div key={className}>
                  <p className="font-medium">{className}:</p>
                  <div className="flex flex-wrap gap-2">
                    {allSubjects.map((subject) => (
                      <label key={subject} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={subjects.includes(subject)}
                          onChange={() => {
                            const updated = [...subjects];
                            if (updated.includes(subject)) {
                              updated.splice(updated.indexOf(subject), 1);
                            } else {
                              updated.push(subject);
                            }
                            updateField(`teachingPreferences.school.${className}`, updated);
                          }}
                        />
                        {subject}
                      </label>
                    ))}
                  </div>
                </div>
              ))} */}
            </div>

            <div className="md:col-span-2 mt-4">
              <h3 className="font-semibold mb-2">Profile Photo</h3>
              <img
                src={selectedMentor.profilePhoto}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MentorEditModal;
