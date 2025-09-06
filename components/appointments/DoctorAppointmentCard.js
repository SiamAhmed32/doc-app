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

  const statusColors = {
    PENDING: "border-yellow-500",
    COMPLETED: "border-green-500",
    CANCELLED: "border-red-500",
  };

  return (
    <div
      className={`flex flex-col justify-between overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 border-l-4 ${
        statusColors[status] || "border-slate-300"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              {patient.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {patient.email}
            </p>
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="mt-4 flex items-center gap-2 border-t pt-4 text-sm font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
          <CalendarIcon className="h-5 w-5" />
          <span>{formattedDate}</span>
        </div>
      </div>
      {status === "PENDING" && (
        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-4 dark:bg-slate-800/50">
          <Button
            onClick={() => onCancel(appointment)}
            variant="destructive"
            size="sm"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onComplete(appointment)}
            variant="success"
            size="sm"
          >
            Complete
          </Button>
        </div>
      )}
    </div>
  );
}
