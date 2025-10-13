import React, { useState } from "react";
import axios from "axios";

const BackupTeacherModal = ({ mentor, mentorList, onClose, getMentorData }) => {
  const [selectedBackups, setSelectedBackups] = useState(
    mentor.backupMentors || []
  );

  const toggleBackup = (mentorId) => {
    if (selectedBackups.includes(mentorId)) {
      setSelectedBackups(selectedBackups.filter((id) => id !== mentorId));
    } else if (selectedBackups.length < 3) {
      setSelectedBackups([...selectedBackups, mentorId]);
    } else {
      alert("Only 3 backup mentors can be selected");
    }
  };

  const saveBackupMentors = () => {
    axios
      .put(`https://homentor-backend.onrender.com/api/mentor/${mentor._id}`, {
        backupMentors: selectedBackups,
      })
      .then(() => {
        getMentorData();
        onClose();
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Select Backup Teachers</h3>
        <div className="flex flex-col gap-2">
          {mentorList
            .filter((m) => m._id !== mentor._id) // Exclude current mentor
            .map((m) => (
              <label key={m._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBackups.includes(m._id)}
                  onChange={() => toggleBackup(m._id)}
                />
                {m.fullName} ({m.phone})
              </label>
            ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={saveBackupMentors}
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackupTeacherModal;
