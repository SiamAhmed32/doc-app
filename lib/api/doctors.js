import apiClient from "@/lib/axios";

const DOCTORS_PER_PAGE = 12;

/**
 * Fetches a list of doctors with pagination, search, and filtering.
 * This is now the single source of truth for fetching multiple doctors.
 * @param {object} params - The query parameters.
 * @param {string} params.searchTerm - The search term for the doctor's name.
 * @param {string} params.specialization - The specialization to filter by.
 * @param {number} params.page - The page number to fetch.
 * @param {number} params.limit - The number of items per page.
 */
export const fetchDoctors = async ({
  searchTerm,
  specialization,
  page = 1,
  limit = DOCTORS_PER_PAGE,
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (searchTerm) {
    params.append("search", searchTerm);
  }
  if (specialization) {
    params.append("specialization", specialization);
  }

  const response = await apiClient.get(`/doctors?${params.toString()}`);
  return response.data;
};

/**
 * Fetches a single doctor by their unique ID.
 * This is the new, efficient function for the profile page.
 * @param {string} doctorId - The ID of the doctor to fetch.
 */
export const fetchDoctorById = async (doctorId) => {
  if (!doctorId) {
    throw new Error("Doctor ID is required.");
  }
  const response = await apiClient.get(`/doctors/${doctorId}`);
  return response.data.data;
};
