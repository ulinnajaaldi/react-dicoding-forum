import React from "react";

import PageWrapper from "@/components/layout/page-wrapper";
import ThreadCard from "./components/ThreadCard";
import HeroSection from "./section/HeroSection";
import useHomepageFeature from "./hook";

const Homepage = () => {
  const {
    authUser,
    category,
    setCategory,
    categories,
    newThreads,
    handleToggleVoteThread,
  } = useHomepageFeature();

  return (
    <PageWrapper>
      <HeroSection
        categories={categories}
        category={category}
        setCategory={setCategory}
      />

      <section className="container mb-10 max-w-2xl">
        <div className="flex flex-col gap-3">
          {newThreads?.map((thread) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              authUser={authUser}
              handleToggleVoteThread={handleToggleVoteThread}
            />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Homepage;
