"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  usePatientAppointments,
  updateAppointmentStatus,
} from "@/lib/api/appointments";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Pagination from "@/components/ui/Pagination";

const statusFilters = ["All", "PENDING", "COMPLETED", "CANCELLED"];

export default function MyAppointmentsPage() {
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const queryClient = useQueryClient();

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setCurrentPage(1);
  };

  const { data, error, isLoading, isFetching } = usePatientAppointments({
    status: status === "All" ? "" : status,
    page: currentPage,
  });

  const appointments = data?.data || [];
  const totalRecords = data?.totalRecords || 0;
  const itemsPerPage = data?.limit || 6;

  const { mutate: cancelAppointment, isPending: isCancelling } = useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: () => {
      toast.success("Appointment cancelled successfully!");
      queryClient.invalidateQueries({ queryKey: ["patient-appointments"] });
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Failed to cancel appointment."
      );
    },
    onSettled: () => {
      setAppointmentToCancel(null);
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

  if (isLoading)
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            My Appointments
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            View and manage your scheduled appointments.
          </p>
        </div>
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-center rounded-md border bg-white p-1 dark:bg-slate-800 dark:border-slate-700">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleStatusChange(filter)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                status === filter || (status === "" && filter === "All")
                  ? "bg-sky-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative">
          {isFetching && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm dark:bg-slate-900/60">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
            </div>
          )}
          {appointments.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {appointments.map((appointment) => (
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
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalRecords}
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
                variant="outline"
                onClick={() => setAppointmentToCancel(null)}
                disabled={isCancelling}
              >
                Go Back
              </Button>
              <Button
                onClick={handleConfirmCancel}
                variant="destructive"
                isLoading={isCancelling}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}
