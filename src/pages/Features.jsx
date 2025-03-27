import { FaRocket } from "react-icons/fa";

const Features = () => {
  const featureList = [
    { title: "Short & Custom URLs", desc: "Create short links & customize aliases.", status: "developed" },
    { title: "Expiring & One-Time Links", desc: "Set expiration by clicks or time.", status: "developed" },
    { title: "Password Protection", desc: "Secure links with a password.", status: "developed" },
    { title: "QR Code Generation", desc: "Get a QR code for every short link.", status: "coming-soon" },
    { title: "Analytics & Tracking", desc: "Monitor visits & link performance.", status: "developed" },
    { title: "User Dashboard", desc: "Manage & organize your links.", status: "in-development" }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "developed":
        return <span className="badge badge-success w-3 h-3"></span>; // Green Ball
      case "in-development":
        return <span className="badge badge-warning w-3 h-3"></span>; // Yellow Ball
      case "coming-soon":
        return <span className="badge badge-error w-3 h-3"></span>; // Red Ball
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 py-10">
      <h2 className="text-5xl font-bold flex items-center gap-3 mb-6">
        <FaRocket className="text-black" /> Features
      </h2>

            {/* Status Legend */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Feature Status:</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="badge badge-success w-3 h-3"></span>
            <span>Developed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-warning w-3 h-3"></span>
            <span>In Development</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-error w-3 h-3"></span>
            <span>Coming Soon</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {featureList.map((feature, index) => (
          <div
            key={index}
            className="bg-black text-white p-6 rounded-2xl shadow-xl text-center flex flex-col items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center gap-2">
              {getStatusBadge(feature.status)}
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
            </div>
            <p className="text-gray-400 mt-2">{feature.desc}</p>
          </div>
        ))}
      </div>


    </section>
  );
};

export default Features;
