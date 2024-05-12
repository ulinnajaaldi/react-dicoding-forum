import { toast } from "sonner";

import { UsersServices } from "@/service/UsersServices";

export const ActionType = {
  RECEIVE_USER: "RECEIVE_USER",
};

export const receiveUsersActionCreator = (user) => ({
  type: ActionType.RECEIVE_USER,
  payload: {
    user,
  },
});

export const asyncRegisterUser =
  ({ name, email, password }) =>
  async () => {
    try {
      const response = await UsersServices.register({ name, email, password });
      toast.success(response.message, {
        description: "You have successfully registered",
        action: {
          label: "Sign In",
          onClick: () => {
            window.location.href = "/";
          },
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
