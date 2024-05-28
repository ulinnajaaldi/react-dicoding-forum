// *Tetsting Scenario:
//   - should render the leaderboard card with the user's name, score, and (You) if the user is the authenticated user

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LeaderboardCard from "./LeaderboardCard";

const mockLeaderboard = {
  user: {
    avatar: "avatar_url",
    name: "Test User",
    id: "1",
  },
  score: 100,
};

const mockAuthUser = {
  data: {
    user: {
      id: "1",
    },
  },
};

describe("LeaderboardCard", () => {
  it("should render the leaderboard card with the user's name, score, and (You) if the user is the authenticated user", () => {
    render(
      <LeaderboardCard leaderboard={mockLeaderboard} authUser={mockAuthUser} />,
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("(You)")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
