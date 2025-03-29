const StatusBadge = ({ status, label }) => {
  const statusClasses = {
    developed: "bg-green-500 text-white",
    "in-development": "bg-yellow-500 text-black",
    "coming-soon": "bg-red-500 text-white",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClasses[status]}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
