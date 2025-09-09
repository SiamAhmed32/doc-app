"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDoctorAppointments } from "@/lib/api/appointments";

/**
 * Custom hook: Fetches a doctor's appointments list
 * Supports filtering by status, date, and pagination (page number).
 * Always provide all params for predictable cache and UI.
 *
 * @param {Object} params
 * @param {string} params.status - Appointment status filter
 * @param {number} params.page - Page number for pagination (required)
 * @param {string|Date|null} [params.date] - Date filter (optional, should be yyyy-mm-dd or Date object)
 */
export function useDoctorAppointments({ status, page, date }) {
  return useQuery({
    queryKey: ["doctor-appointments", { status, page, date }],
    queryFn: () => fetchDoctorAppointments({ status, page, date }),
    keepPreviousData: true,
  });
}
