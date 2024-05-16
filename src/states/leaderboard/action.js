import { LeaderboardsServices } from "@/service/LeaderboardsServices";
import { hideLoading } from "react-redux-loading-bar";
import { showLoading } from "react-redux-loading-bar";

export const ActionType = {
  FETCH_LEADERBOARD: "FETCH_LEADERBOARD",
};

export const fetchLeaderboardActionCreator = (leaderboard) => ({
  type: ActionType.FETCH_LEADERBOARD,
  payload: {
    leaderboard,
  },
});

export const asyncFetchLeaderboard = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const leaderboard = await LeaderboardsServices.getLeaderboards();
    dispatch(fetchLeaderboardActionCreator(leaderboard));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(hideLoading());
  }
};
