import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";

import userReducer from "./users/reducer";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: userReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
