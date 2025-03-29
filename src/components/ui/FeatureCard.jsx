import { FaCheck } from "react-icons/fa";
import StatusBadge from "./StatusBadge"; // Importing StatusBadge

const FeatureCard = ({ title, desc, status, isPricing }) => {
  return (
    <div className="bg-black text-white p-6 rounded-2xl shadow-xl text-center flex flex-col items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center gap-2">
        {isPricing ? <FaCheck className="text-green-400" /> : <StatusBadge status={status} />}
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400 mt-2">{desc}</p>
    </div>
  );
};

export default FeatureCard;
