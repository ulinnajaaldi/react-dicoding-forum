import { ActionType } from "./action";

const userReducer = (user = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_USER:
      return action.payload.user;
    default:
      return user;
  }
};

export default userReducer;
