import { useQuery } from "@tanstack/react-query";
import apiClient from "../lib/axios";

/**
 * Fetches a single, paginated, and filtered list of doctors from the API.
 * This function is now efficient, leveraging the server's capabilities for
 * searching, filtering, and pagination.
 *
 * @param {object} params - The query parameters.
 * @param {string} params.searchTerm - The search term for the doctor's name.
 * @param {string} params.specialization - The specialization to filter by.
 * @param {number} params.page - The page number to fetch.
 */
export const fetchDoctors = async ({
  searchTerm,
  specialization,
  page = 1,
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "12",
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
 * A custom React Query hook to fetch and manage the state for the doctors list.
 *
 * @param {object} params - The filtering and pagination parameters from the UI.
 * @param {string} params.searchTerm - The debounced search term.
 * @param {string} params.specialization - The selected specialization.
 * @param {number} params.page - The current page number.
 */
export function useDoctors({ searchTerm, specialization, page }) {
  return useQuery({
    queryKey: ["doctors", { searchTerm, specialization, page }],

    queryFn: () => fetchDoctors({ searchTerm, specialization, page }),

    keepPreviousData: true,
  });
}
