import { useQuery } from "@tanstack/react-query";
import apiClient from "../validations/../axios";

const APPOINTMENTS_PER_PAGE = 6;

// --- CORE API FUNCTIONS ---

export const createAppointment = async (appointmentData) => {
  const response = await apiClient.post("/appointments", appointmentData);
  return response.data;
};

export const updateAppointmentStatus = async ({ appointmentId, status }) => {
  const response = await apiClient.patch("/appointments/update-status", {
    appointment_id: appointmentId,
    status,
  });
  return response.data;
};

export const fetchPatientAppointments = async ({ status, page = 1 }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: APPOINTMENTS_PER_PAGE.toString(),
  });
  if (status) {
    params.append("status", status);
  }
  const response = await apiClient.get(
    `/appointments/patient?${params.toString()}`
  );

  return response.data;
};

export const fetchDoctorAppointments = async ({ status, date, page = 1 }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: APPOINTMENTS_PER_PAGE.toString(),
  });
  if (status) {
    params.append("status", status);
  }
  if (date) {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    params.append("date", formattedDate);
  }
  const response = await apiClient.get(
    `/appointments/doctor?${params.toString()}`
  );

  return response.data;
};

// --- REACT QUERY HOOKS ---

export function usePatientAppointments({ status, page }) {
  return useQuery({
    queryKey: ["patient-appointments", { status, page }],
    queryFn: () => fetchPatientAppointments({ status, page }),
    keepPreviousData: true,
  });
}

export function useDoctorAppointments({ status, date, page }) {
  return useQuery({
    queryKey: ["doctor-appointments", { status, date, page }],
    queryFn: () => fetchDoctorAppointments({ status, date, page }),
    keepPreviousData: true,
  });
}
