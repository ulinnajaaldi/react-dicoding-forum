import { toast } from "sonner";

import { putAccessToken } from "@/utils";
import { UsersServices } from "@/service/UsersServices";

export const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

export const setAuthUserActionCreator = (authUser) => ({
  type: ActionType.SET_AUTH_USER,
  payload: {
    authUser,
  },
});

export const unsetAuthUserActionCreator = () => ({
  type: ActionType.UNSET_AUTH_USER,
  payload: {
    authUser: null,
  },
});

export const asyncSetAuthUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await UsersServices.login({ email, password });

      toast.success(response.message, {
        description: "You have successfully logged in",
      });

      const token = response.data.token;
      putAccessToken(token);

      const authUser = await UsersServices.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

export const asyncUnsetAuthUser = () => (dispatch) => {
  dispatch(unsetAuthUserActionCreator());
  toast.success("You have successfully logged out");
  putAccessToken("");
};
