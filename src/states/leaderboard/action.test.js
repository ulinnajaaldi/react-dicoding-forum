/* eslint-disable no-unused-expressions */

// * Skenario Test
//  Should dispatch fetchLeaderboardActionCreator with the fetched leaderboards

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import { LeaderboardsServices } from "@/service/LeaderboardsServices";
import { asyncFetchLeaderboard, fetchLeaderboardActionCreator } from "./action";

const fakeLeaderboard = [
  {
    user: {
      id: "users-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 10,
  },
];

describe("asyncFetchLeaderboardThunk", () => {
  beforeEach(() => {
    LeaderboardsServices.getLeaderboards;
  });

  afterEach(() => {
    LeaderboardsServices.getLeaderboards;

    delete LeaderboardsServices.getLeaderboards;
  });

  it("should dispatch fetchLeaderboardActionCreator with the fetched leaderboards", async () => {
    LeaderboardsServices.getLeaderboards = () =>
      Promise.resolve(fakeLeaderboard);

    const dispatch = vi.fn();

    await asyncFetchLeaderboard()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(
      fetchLeaderboardActionCreator(fakeLeaderboard),
    );
  });
});
