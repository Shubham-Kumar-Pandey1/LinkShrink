import { FaCheck, FaRocket } from "react-icons/fa";

const Pricing = () => {
  const features = [
    { title: "Short & Custom URLs", desc: "Create short links & customize aliases." },
    { title: "Expiring & One-Time Links", desc: "Set expiration by clicks or time." },
    { title: "Password Protection", desc: "Secure links with a password." },
    { title: "QR Code Generation", desc: "Get a QR code for every short link." },
    { title: "Analytics & Tracking", desc: "Monitor visits & link performance." },
    { title: "User Dashboard", desc: "Manage & organize your links." }
  ];

  return (
    <section className="bg-white text-black flex flex-col items-center justify-center px-6 py-16 min-h-screen">
      {/* Hurray Message */}
      <h2 className="text-4xl md:text-5xl font-bold text-center text-green-600 mb-6">
        🎉 Hurray! All Features Are Free! 🎉
      </h2>
      <p className="text-lg md:text-xl text-center text-gray-700 mb-10">
        No hidden charges, no subscriptions. Enjoy all premium features at zero cost!
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-black text-white p-4 rounded-lg shadow-md text-center flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-105 w-full"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FaCheck className="text-green-400" /> {feature.title}
            </h3>
            <p className="text-gray-400 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
