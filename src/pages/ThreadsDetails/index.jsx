import React from "react";

import ActionTopBack from "@/components/common/action-top-back";
import PageWrapper from "@/components/layout/page-wrapper";
import PageLoading from "@/components/layout/page-loading";
import PageNotFound from "@/components/layout/page-not-found";
import { CommentSection, ThreadDetailSection } from "./section";
import useThreadsDetailsFeature from "./hook";

const ThreadsDetails = () => {
  const {
    threadsDetails,
    authUser,
    content,
    setContent,
    handleToggleVoteComment,
    handleUpVoteThread,
    handleDownVoteThread,
    handleComment,
    isLoading,
  } = useThreadsDetailsFeature();

  if (isLoading) {
    return <PageLoading />;
  }

  if (!threadsDetails?.id) {
    return <PageNotFound title={"Thread"} url={"/threads"} />;
  }

  return (
    <PageWrapper>
      <ActionTopBack url="/threads" />
      <ThreadDetailSection
        threadsDetails={threadsDetails}
        authUser={authUser}
        content={content}
        setContent={setContent}
        handleUpVoteThread={handleUpVoteThread}
        handleDownVoteThread={handleDownVoteThread}
        handleComment={(e) => {
          e.preventDefault();
          handleComment({ content });
          setContent("");
        }}
      />

      <CommentSection
        authUser={authUser}
        handleToggleVoteComment={handleToggleVoteComment}
        threadsDetails={threadsDetails}
      />
    </PageWrapper>
  );
};

export default ThreadsDetails;
