import { IndianRupee } from "lucide-react";

const TeachingModesDisplay = ({ mentorData, setSelectedMentor }) => {
  const modes = mentorData.teachingModes || {};

  return (
    <div className="rounded-2xl shadow-sm border border-mentor-yellow-200 mt-6">
      <div className="bg-gradient-to-r from-mentor-yellow-500 to-mentor-yellow-600 text-black rounded-t-2xl px-4 py-3 flex items-center gap-2">
        <IndianRupee className="h-5 w-5" />
        <h3 className="font-semibold text-base">
          Teaching Modes & Monthly Pricing
        </h3>
      </div>
      {Object.entries(mentorData.teachingModes).map((mode, index) => (
        <div
          key={index}
          className="bg-yellow-50 border  gap-4 border-yellow-200 rounded-lg mx-4 p-4"
        >
          <h4 className="font-medium text-mentor-yellow-700 text-base mb-1">
            {mode[0]?.replace(/^./, (c) => c.toUpperCase())} -
          </h4>

          <div className="text-sm text-gray-800 flex gap-1 items-center">
            <span className="font-semibold text-nowrap">Monthly Price: ₹ </span>{" "}
            <input
            className="border"
              onChange={(e) =>
                setSelectedMentor({
                  ...mentorData,
                  teachingModes: {
                    ...mentorData.teachingModes,
                    [mode[0]]: { monthlyPrice: e.target.value },
                  },
                })
              }
              value={mode[1]?.monthlyPrice?.toLocaleString()}
            ></input>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeachingModesDisplay;
