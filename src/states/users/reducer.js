import { ActionType } from "./action";

const userReducer = (user = [], action = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_USER:
      return action.payload.user;
    case ActionType.FETCH_USRES:
      return action.payload.users;
    default:
      return user;
  }
};

export default userReducer;
