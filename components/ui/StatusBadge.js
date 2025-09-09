"use client";

export default function StatusBadge({ status }) {
  const base =
    "px-2 py-1 text-xs font-semibold rounded-full text-center border";
  let colorClasses = "";

  switch (status) {
    case "PENDING":
      colorClasses = "bg-yellow-100 border-yellow-300 text-yellow-800";
      break;
    case "COMPLETED":
      colorClasses = "bg-green-100 border-green-300 text-green-800";
      break;
    case "CANCELLED":
      colorClasses = "bg-red-100 border-red-300 text-red-800";
      break;
    default:
      colorClasses = "bg-gray-100 border-gray-300 text-gray-800";
  }

  return <span className={`${base} ${colorClasses}`}>{status}</span>;
}
