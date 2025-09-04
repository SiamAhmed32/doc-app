"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { usePatientAppointments } from "@/hooks/usePatientAppointments";
import { updateAppointmentStatus } from "@/lib/api/appointments";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Pagination from "@/components/ui/Pagination";

const statusFilters = ["All", "PENDING", "COMPLETED", "CANCELLED"];
const APPOINTMENTS_PER_PAGE = 6;

export default function MyAppointmentsPage() {
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: appointments = [],
    error,
    isLoading,
  } = usePatientAppointments({
    status: status === "All" ? "" : status,
  });

  const { mutate: cancelAppointment, isPending: isCancelling } = useMutation({
    mutationFn: updateAppointmentStatus,
    onMutate: async (newAppointment) => {
      await queryClient.cancelQueries({
        queryKey: [
          "patient-appointments",
          { status: status === "All" ? "" : status },
        ],
      });
      const previousAppointments = queryClient.getQueryData([
        "patient-appointments",
        { status: status === "All" ? "" : status },
      ]);

      queryClient.setQueryData(
        ["patient-appointments", { status: status === "All" ? "" : status }],
        (oldData) => {
          const newData = oldData.map((apt) =>
            apt.id === newAppointment.appointmentId
              ? { ...apt, status: "CANCELLED" }
              : apt
          );
          return newData;
        }
      );

      setAppointmentToCancel(null);
      return { previousAppointments };
    },
    onError: (err, newAppointment, context) => {
      queryClient.setQueryData(
        ["patient-appointments", { status: status === "All" ? "" : status }],
        context.previousAppointments
      );
      toast.error("Failed to cancel appointment. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "patient-appointments",
          { status: status === "All" ? "" : status },
        ],
      });
    },
  });

  const handleConfirmCancel = () => {
    if (appointmentToCancel) {
      cancelAppointment({
        appointmentId: appointmentToCancel.id,
        status: "CANCELLED",
      });
    }
  };

  const indexOfLastItem = currentPage * APPOINTMENTS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - APPOINTMENTS_PER_PAGE;
  const currentAppointments = appointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (isLoading)
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center dark:bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  if (error)
    return (
      <div className="p-4 text-center text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            My Appointments
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            View and manage your scheduled appointments.
          </p>
        </div>
        <div className="mb-8 flex justify-center rounded-md border bg-white p-1 dark:bg-gray-800 dark:border-gray-700">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setStatus(filter)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                status === filter || (status === "" && filter === "All")
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        {currentAppointments.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {currentAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onCancel={setAppointmentToCancel}
              />
            ))}
          </motion.div>
        ) : (
          <div className="py-20 text-center text-gray-500">
            <h3 className="text-2xl font-semibold">No Appointments</h3>
            <p className="mt-2">You have no appointments with this status.</p>
          </div>
        )}
        <Pagination
          itemsPerPage={APPOINTMENTS_PER_PAGE}
          totalItems={appointments.length}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <Modal
          isOpen={!!appointmentToCancel}
          onClose={() => setAppointmentToCancel(null)}
          title="Confirm Cancellation"
        >
          <div className="flex flex-col space-y-4">
            <p className="dark:text-gray-300">
              Are you sure you want to cancel your appointment with Dr.{" "}
              {appointmentToCancel?.doctor.name}?
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setAppointmentToCancel(null)}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                disabled={isCancelling}
              >
                Go Back
              </Button>
              <Button
                onClick={handleConfirmCancel}
                className="bg-red-600 hover:bg-red-700"
                disabled={isCancelling}
              >
                {isCancelling ? "Cancelling..." : "Confirm"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
