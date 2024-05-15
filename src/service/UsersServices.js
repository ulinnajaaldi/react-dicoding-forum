import { axiosInstance, axiosInstanceWithAuth } from "@/lib/axios";

const register = async ({ name, email, password }) => {
  const response = await axiosInstance.post("/register", {
    name,
    email,
    password,
  });

  return response.data;
};

const login = async ({ email, password }) => {
  const response = await axiosInstance.post("/login", {
    email,
    password,
  });

  return response.data;
};

const getAll = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

const getOwnProfile = async () => {
  const response = await axiosInstanceWithAuth.get("/users/me");
  return response.data;
};

export const UsersServices = {
  register,
  login,
  getAll,
  getOwnProfile,
};
