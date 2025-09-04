import apiClient from "@/lib/axios";

export const createAppointment = async (appointmentData) => {
  const response = await apiClient.post("/appointments", appointmentData);
  return response.data;
};

export const fetchPatientAppointments = async ({ queryKey }) => {
  const [_key, { status }] = queryKey;
  const params = new URLSearchParams();
  if (status) {
    params.append("status", status);
  }
  const response = await apiClient.get(
    `/appointments/patient?${params.toString()}`
  );
  return response.data.data;
};

export const updateAppointmentStatus = async ({ appointmentId, status }) => {
  const response = await apiClient.patch("/appointments/update-status", {
    appointment_id: appointmentId,
    status,
  });
  return response.data;
};

export const fetchDoctorAppointments = async ({ queryKey }) => {
  const [_key, { status, date }] = queryKey;
  // Workaround: Do not send pagination params to avoid backend bug.
  const params = new URLSearchParams();
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
  return response.data.data;
};
