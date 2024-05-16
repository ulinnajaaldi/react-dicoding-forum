import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { asyncFetchLeaderboard } from "@/states/leaderboard/action";
import ActionTopBack from "@/components/common/action-top-back";
import PageWrapper from "@/components/layout/page-wrapper";
import LeaderboardCard from "./components/LeaderboardCard";

const Leaderboards = () => {
  const dispatch = useDispatch();
  const { leaderboards, authUser } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncFetchLeaderboard());
  }, [dispatch]);

  return (
    <PageWrapper>
      <ActionTopBack url={"/"} />
      <section className="container max-w-2xl py-10">
        <h1 className=" text-3xl font-bold md:text-4xl">Leaderboards</h1>
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex items-center justify-between border-b text-base md:text-lg">
            <div className="flex items-center gap-2">
              <p className="font-bold">User</p>
            </div>
            <p className="font-bold">Score</p>
          </div>
          {leaderboards?.map((leaderboard, index) => (
            <LeaderboardCard
              key={index}
              leaderboard={leaderboard}
              authUser={authUser}
            />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Leaderboards;
