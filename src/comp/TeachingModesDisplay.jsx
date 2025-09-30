import { IndianRupee } from "lucide-react";

const TeachingModesDisplay = ({ mentorData }) => {
  const modes = mentorData.teachingModes || {};

  return (
    <div className="rounded-2xl shadow-sm border border-mentor-yellow-200 mt-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-mentor-yellow-500 to-mentor-yellow-600 text-black rounded-t-2xl px-4 py-3 flex items-center gap-2">
        <IndianRupee className="h-5 w-5" />
        <h3 className="font-semibold text-base">Teaching Modes & Pricing</h3>
      </div>

      {/* Modes List */}
      {Object.entries(modes).map(([modeName, modeData], index) => {
        const monthlyPrice = Number(modeData?.monthlyPrice) || 0;
        const margin = Number(modeData?.margin) || 0;
        const finalPrice = monthlyPrice + margin;

        return (
          <div
            key={index}
            className="bg-yellow-50 border border-yellow-200 rounded-lg mx-4 mt-4 p-4"
          >
            {/* Mode Title */}
            <h4 className="font-medium text-mentor-yellow-700 text-base mb-3">
              {modeName?.replace(/^./, (c) => c.toUpperCase())}
            </h4>

            {/* Fee Info */}
            <div className="flex flex-col gap-2 text-sm text-gray-800">
              <p>
                <span className="font-semibold">Teacher Fee: </span>
                ₹{monthlyPrice.toLocaleString()}
              </p>

              <p>
                <span className="font-semibold">Showing Fee: </span>
                ₹{finalPrice.toLocaleString()}{" "}
                <span className="text-gray-500 text-xs">
                  (includes margin ₹{margin.toLocaleString()})
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeachingModesDisplay;
