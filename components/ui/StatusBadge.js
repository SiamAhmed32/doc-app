export default function StatusBadge({ status }) {
  const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
  let colorClasses = "";

  switch (status) {
    case "PENDING":
      colorClasses = "bg-yellow-100 text-yellow-800";
      break;
    case "COMPLETED":
      colorClasses = "bg-green-100 text-green-800";
      break;
    case "CANCELLED":
      colorClasses = "bg-red-100 text-red-800";
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-800";
  }

  return <span className={`${baseClasses} ${colorClasses}`}>{status}</span>;
}