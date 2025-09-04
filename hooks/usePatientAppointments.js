"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPatientAppointments } from "@/lib/api/appointments";

/**
 * @hook usePatientAppointments
 * @description Fetches a filterable list of a patient's appointments.
 */
export function usePatientAppointments({ status }) {
  return useQuery({
    queryKey: ["patient-appointments", { status }],
    queryFn: fetchPatientAppointments,
  });
}
