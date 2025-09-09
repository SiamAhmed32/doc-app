"use client";

import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge";

const CalendarIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z"
    />
  </svg>
);

export default function DoctorAppointmentCard({
  appointment,
  onComplete,
  onCancel,
}) {
  const { patient, date, status } = appointment;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Distinct left color-bar for fast status scan
  const statusColors = {
    PENDING: "border-yellow-500",
    COMPLETED: "border-green-500",
    CANCELLED: "border-red-500",
  };

  return (
    <div
      className={`flex flex-col justify-between overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 border-l-4 ${
        statusColors[status] || "border-slate-300"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white truncate max-w-[150px] sm:max-w-none">
              {patient.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate max-w-[180px] sm:max-w-none">
              {patient.email}
            </p>
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="mt-4 flex items-center gap-2 border-t pt-3 text-xs sm:text-sm font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
          <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>{formattedDate}</span>
        </div>
      </div>
      {status === "PENDING" && (
        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 dark:bg-slate-800/50">
          <Button
            onClick={() => onCancel(appointment)}
            variant="destructive"
            size="sm"
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onComplete(appointment)}
            variant="success"
            size="sm"
            className="w-full"
          >
            Complete
          </Button>
        </div>
      )}
    </div>
  );
}
