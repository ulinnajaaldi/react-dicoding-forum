import { axiosInstance } from "@/lib/axios";

const getLeaderboards = async () => {
  const response = await axiosInstance.get("/leaderboards");
  return response.data;
};

export const LeaderboardsServices = {
  getLeaderboards,
};
