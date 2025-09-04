import apiClient from "@/lib/axios";

/**
 * This is the definitive, resilient data-fetching function. It is designed
 * to handle the API's hardcoded pagination by fetching all pages.
 *
 * It works by:
 * 1. Fetching the first page to get the total number of pages from the response.
 * 2. Creating an array of promises to fetch all other pages in parallel.
 * 3. Executing all promises and safely combining the results into a single,
 * comprehensive list of all doctors.
 *
 * This ensures the UI always has the full dataset, meeting the core project requirement.
 */
export const fetchDoctors = async () => {
  // 1. Fetch the first page to get pagination details.
  const firstPageResponse = await apiClient.get("/doctors?page=1&limit=10");

  // 2. Safely access the response data and totalPages based on the diagnostic logs.
  const responseData = firstPageResponse.data;
  if (!responseData || !Array.isArray(responseData.data)) {
    // If the API structure is unexpected, return an empty array to prevent crashes.
    return [];
  }

  const totalPages = responseData.totalPages;
  const firstPageDoctors = responseData.data;

  // 3. If there's only one page, return its data immediately.
  if (totalPages <= 1) {
    return firstPageDoctors;
  }

  // 4. Create promises to fetch all other pages (from 2 to totalPages).
  const pagePromises = [];
  for (let page = 2; page <= totalPages; page++) {
    pagePromises.push(apiClient.get(`/doctors?page=${page}&limit=10`));
  }

  // 5. Execute all promises in parallel and combine the results.
  const allOtherPageResponses = await Promise.all(pagePromises);

  // 6. Safely extract the doctor array from each subsequent response and flatten the result.
  const subsequentDoctors = allOtherPageResponses.flatMap(
    (response) => response.data?.data || []
  );

  // 7. Combine the doctors from the first page with the rest to form the complete list.
  return [...firstPageDoctors, ...subsequentDoctors];
};
