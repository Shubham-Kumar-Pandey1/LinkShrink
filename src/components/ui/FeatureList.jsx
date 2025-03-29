import FeatureCard from "./FeatureCard";

const FeatureList = ({ features, isPricing }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} isPricing={isPricing} />
      ))}
    </div>
  );
};

export default FeatureList;
