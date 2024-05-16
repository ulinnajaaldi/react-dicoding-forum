import { ActionType } from "./action";

const leaderboardReducer = (leaderboards = [], action) => {
  switch (action.type) {
    case ActionType.FETCH_LEADERBOARD:
      return action.payload.leaderboard.data.leaderboards;
    default:
      return leaderboards;
  }
};

export default leaderboardReducer;
