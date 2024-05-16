import React from "react";

const LeaderboardCard = ({ leaderboard, authUser }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3 text-sm md:text-base">
      <div className="flex items-center gap-2">
        <img
          src={leaderboard.user.avatar}
          alt={leaderboard.user.name}
          className="h-7 w-7 rounded-full md:h-10 md:w-10"
        />
        <p>
          {leaderboard.user.name}
          {authUser?.data?.user?.id === leaderboard.user.id && (
            <span className="ml-2 text-sm text-gray-400">(You)</span>
          )}
        </p>
      </div>
      <p className="font-semibold">{leaderboard.score}</p>
    </div>
  );
};

export default LeaderboardCard;
