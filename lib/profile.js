import apiClient from "@/lib/axios";

export const getMyProfile = async () => {
  const response = await apiClient.get("/users/me");

  return response.data;
};

export const updateMyProfile = async (profileData) => {
  const response = await apiClient.patch("/users/me", profileData);

  return response.data;
};
