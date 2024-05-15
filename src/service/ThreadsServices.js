import { axiosInstance, axiosInstanceWithAuth } from "@/lib/axios";

const create = async ({ title, body, category }) => {
  const response = await axiosInstanceWithAuth.post("/threads", {
    title,
    body,
    category,
  });

  return response.data;
};

const getAll = async () => {
  const response = await axiosInstance.get("/threads");
  return response.data;
};

const getDetails = async (id) => {
  const response = await axiosInstance.get(`/threads/${id}`);
  return response.data;
};

export const ThreadsServices = {
  create,
  getAll,
  getDetails,
};
