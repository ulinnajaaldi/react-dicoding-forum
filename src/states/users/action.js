import { toast } from "sonner";

import { UsersServices } from "@/service/UsersServices";

export const ActionType = {
  RECEIVE_USER: "RECEIVE_USER",
  FETCH_USRES: "FETCH_USERS",
};

export const receiveUsersActionCreator = (user) => {
  return {
    type: ActionType.RECEIVE_USER,
    payload: {
      user,
    },
  };
};

export const fetchUsersActionCreator = (users) => ({
  type: ActionType.FETCH_USRES,
  payload: {
    users,
  },
});

export const asyncRegisterUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const response = await UsersServices.register({ name, email, password });
      dispatch(receiveUsersActionCreator(response));
      toast.success(response.message, {
        description: "You have successfully registered",
        action: {
          label: "Sign In",
          onClick: () => {
            window.location.href = "/login";
          },
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal mendaftar");
    }
  };

export const asyncFetchUsers = () => async (dispatch) => {
  try {
    const users = await UsersServices.getAll();
    dispatch(fetchUsersActionCreator(users));
  } catch (error) {
    console.error(error);
  }
};
