import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge"; 

export default function AppointmentCard({ appointment, onCancel }) {
  const { doctor, date, status } = appointment;
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
            Dr. {doctor.name}
          </h3>
          <StatusBadge status={status} />
        </div>
        <p className="text-sm text-gray-500">{doctor.specialization}</p>
        <p className="mt-2 text-sm font-medium text-gray-700">
          Date: {formattedDate}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t">
        {status === "PENDING" && (
          <Button
            onClick={() => onCancel(appointment)}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Cancel Appointment
          </Button>
        )}
      </div>
    </div>
  );
}
