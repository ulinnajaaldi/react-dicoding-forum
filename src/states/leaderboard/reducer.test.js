// * Skenario Test
//  Should return the initial state
//  Should handle FETCH_LEADERBOARD

import { describe, it, expect } from "vitest";

import leaderboardReducer from "./reducer";

describe("leaderboard reducer", () => {
  it("should return the initial state", () => {
    const initialState = [];
    const action = { type: "unknown" };

    const nextState = leaderboardReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it("should handle FETCH_LEADERBOARD", () => {
    const initialState = [];
    const action = {
      type: "FETCH_LEADERBOARD",
      payload: {
        leaderboard: {
          data: {
            leaderboards: [
              {
                user: {
                  id: "users-1",
                  name: "John Doe",
                  email: "john@example.com",
                  avatar: "https://generated-image-url.jpg",
                },
                score: 10,
              },
            ],
          },
        },
      },
    };

    const nextState = leaderboardReducer(initialState, action);
    expect(nextState).toEqual(action.payload.leaderboard.data.leaderboards);
  });
});
