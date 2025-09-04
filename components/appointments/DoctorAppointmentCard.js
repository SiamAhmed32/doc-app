import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge";

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

  return (
    <div className="flex flex-col justify-between rounded-lg border bg-white p-4 shadow-sm">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {patient.name}
          </h3>
          <StatusBadge status={status} />
        </div>
        <p className="text-sm text-gray-500">{patient.email}</p>
        <p className="mt-2 text-sm font-medium text-gray-700">
          Date: {formattedDate}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t">
        {status === "PENDING" && (
          <div className="flex space-x-2">
            <Button
              onClick={() => onCancel(appointment)}
              className="w-full bg-red-600 text-sm hover:bg-red-700"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onComplete(appointment)}
              className="w-full bg-green-600 text-sm hover:bg-green-700"
            >
              Mark as Completed
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
