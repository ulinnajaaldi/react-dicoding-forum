import { hideLoading, showLoading } from "react-redux-loading-bar";

import { UsersServices } from "@/service/UsersServices";
import { setAuthUserActionCreator } from "../authUser/action";

export const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

export const setIsPreloadActionCreator = (isPreload) => ({
  type: ActionType.SET_IS_PRELOAD,
  payload: {
    isPreload,
  },
});

const asyncPreloadProcess = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      // preload process
      const authUser = await UsersServices.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // fallback process
      dispatch(setAuthUserActionCreator(null));
    } finally {
      // end preload process
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
};

export default asyncPreloadProcess;
