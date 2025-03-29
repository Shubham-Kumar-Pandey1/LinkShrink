import FeatureList from "./ui/FeatureList.jsx";

const Pricing = () => {
  const pricingFeatures = [
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

      {/* Feature List */}
      <FeatureList features={pricingFeatures} isPricing={true} />
    </section>
  );
};

export default Pricing;
