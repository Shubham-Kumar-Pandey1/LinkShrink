import { FaRocket } from "react-icons/fa";
import FeatureList from "./ui/FeatureList";
import StatusBadge from "./ui/StatusBadge";

const Features = () => {
  const featureList = [
    { title: "Short & Custom URLs", desc: "Create short links & customize aliases.", status: "developed" },
    { title: "Expiring & One-Time Links", desc: "Set expiration by clicks or time.", status: "developed" },
    { title: "Password Protection", desc: "Secure links with a password.", status: "developed" },
    { title: "QR Code Generation", desc: "Get a QR code for every short link.", status: "coming-soon" },
    { title: "Analytics & Tracking", desc: "Monitor visits & link performance.", status: "developed" },
    { title: "User Dashboard", desc: "Manage & organize your links.", status: "in-development" }
  ];

  return (
    <section className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-10">
      <h2 className="text-5xl font-bold flex items-center gap-3 mb-6">
        <FaRocket className="text-black" /> Features
      </h2>

      {/* Status Legend */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Feature Status:</h3>
        <div className="flex gap-4">
          <StatusBadge status="developed" label="Developed" />
          <StatusBadge status="in-development" label="In Development" />
          <StatusBadge status="coming-soon" label="Coming Soon" />
        </div>
      </div>

      {/* Feature List */}
      <FeatureList features={featureList} showStatus={true} />
    </section>
  );
};

export default Features;
