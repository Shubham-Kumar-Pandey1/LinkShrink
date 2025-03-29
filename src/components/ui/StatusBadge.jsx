const StatusBadge = ({ status }) => {
    const statusColors = {
      developed: "badge-success",
      "in-development": "badge-warning",
      "coming-soon": "badge-error"
    };
  
    return <span className={`badge w-3 h-3 ${statusColors[status]}`}></span>;
  };
  
  export default StatusBadge;
  