import { FaCheck } from "react-icons/fa";
import StatusBadge from "./StatusBadge"; // Importing StatusBadge

const FeatureCard = ({ title, desc, status, isPricing }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl text-center flex flex-col items-center gap-3 
        transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-700">
      
      {/* Title & Status */}
      <div className="flex items-center gap-2">
        {isPricing ? <FaCheck className="text-green-400 text-lg" /> : <StatusBadge status={status} />}
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-gray-300 mt-2 text-lg">{desc}</p>
    </div>
  );
};

export default FeatureCard;
