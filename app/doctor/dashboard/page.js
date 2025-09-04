"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useDoctorAppointments } from "@/hooks/useDoctorAppointments";
import { updateAppointmentStatus } from "@/lib/api/appointments";
import DoctorAppointmentCard from "@/components/appointments/DoctorAppointmentCard";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Pagination from "@/components/ui/Pagination";

const statusFilters = ["All", "PENDING", "COMPLETED", "CANCELLED"];
const APPOINTMENTS_PER_PAGE = 6;

export default function DoctorDashboardPage() {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentToUpdate, setAppointmentToUpdate] = useState(null);
  const [updateAction, setUpdateAction] = useState("");
  const queryClient = useQueryClient();

  const {
    data: appointments = [],
    error,
    isLoading,
  } = useDoctorAppointments({
    status: status === "All" ? "" : status,
    date,
  });

  const { mutate: changeStatus, isPending: isUpdating } = useMutation({
    mutationFn: updateAppointmentStatus,
    onMutate: async (newAppointment) => {
      await queryClient.cancelQueries({
        queryKey: [
          "doctor-appointments",
          { status: status === "All" ? "" : status, date },
        ],
      });
      const previousAppointments = queryClient.getQueryData([
        "doctor-appointments",
        { status: status === "All" ? "" : status, date },
      ]);

      queryClient.setQueryData(
        [
          "doctor-appointments",
          { status: status === "All" ? "" : status, date },
        ],
        (oldData) => {
          const newData = oldData.map((apt) =>
            apt.id === newAppointment.appointmentId
              ? { ...apt, status: newAppointment.status }
              : apt
          );
          return newData;
        }
      );

      setAppointmentToUpdate(null);
      return { previousAppointments };
    },
    onError: (err, newAppointment, context) => {
      queryClient.setQueryData(
        [
          "doctor-appointments",
          { status: status === "All" ? "" : status, date },
        ],
        context.previousAppointments
      );
      toast.error("Failed to update status. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "doctor-appointments",
          { status: status === "All" ? "" : status, date },
        ],
      });
    },
  });

  const openConfirmationModal = (appointment, action) => {
    setAppointmentToUpdate(appointment);
    setUpdateAction(action);
  };

  const handleConfirmUpdate = () => {
    if (appointmentToUpdate) {
      changeStatus({
        appointmentId: appointmentToUpdate.id,
        status: updateAction,
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
            Appointment Dashboard
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Manage your patient appointments.
          </p>
        </div>
        <div className="sticky top-[72px] z-10 mb-8 flex flex-col space-y-4 rounded-lg bg-white/70 p-4 shadow-md backdrop-blur-sm dark:bg-gray-800/70 md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative flex-1">
            <DatePicker
              placeholderText="Filter by date..."
              selected={date}
              onChange={(d) => setDate(d)}
              isClearable
              className="block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-md border bg-white p-1 dark:bg-gray-900 dark:border-gray-700">
            {statusFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setStatus(filter)}
                className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  status === filter || (status === "" && filter === "All")
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        {currentAppointments.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {currentAppointments.map((appointment) => (
              <DoctorAppointmentCard
                key={appointment.id}
                appointment={appointment}
                onCancel={(apt) => openConfirmationModal(apt, "CANCELLED")}
                onComplete={(apt) => openConfirmationModal(apt, "COMPLETED")}
              />
            ))}
          </motion.div>
        ) : (
          <div className="py-20 text-center text-gray-500">
            <h3 className="text-2xl font-semibold">No Appointments Found</h3>
            <p className="mt-2">No appointments match the current filters.</p>
          </div>
        )}
        <Pagination
          itemsPerPage={APPOINTMENTS_PER_PAGE}
          totalItems={appointments.length}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <Modal
          isOpen={!!appointmentToUpdate}
          onClose={() => setAppointmentToUpdate(null)}
          title={`Confirm Action: Mark as ${updateAction}`}
        >
          <div className="flex flex-col space-y-4">
            <p className="dark:text-gray-300">
              Are you sure you want to mark this appointment as{" "}
              {updateAction.toLowerCase()}?
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setAppointmentToUpdate(null)}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                disabled={isUpdating}
              >
                Go Back
              </Button>
              <Button
                onClick={handleConfirmUpdate}
                className={
                  updateAction === "CANCELLED"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Confirm"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
