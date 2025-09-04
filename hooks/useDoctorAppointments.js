"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDoctorAppointments } from "@/lib/api/appointments";

/**
 * @hook useDoctorAppointments
 * @description Fetches a filterable list of a doctor's appointments.
 */
export function useDoctorAppointments({ status, date }) {
  return useQuery({
    queryKey: ["doctor-appointments", { status, date }],
    queryFn: fetchDoctorAppointments,
  });
}
