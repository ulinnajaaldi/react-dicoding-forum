import React from "react";

import { CommentCard } from "../components";

const CommentSection = (props) => {
  const { authUser, handleToggleVoteComment, threadsDetails } = props;

  return (
    <section className="container mb-10 max-w-2xl space-y-4">
      <h2 className="text-base font-semibold md:text-lg">
        Komentar ({threadsDetails?.comments?.length})
      </h2>
      <div className="space-y-3 md:space-y-6">
        {threadsDetails?.comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            authUser={authUser}
            handleUpVoteComment={() => {
              handleToggleVoteComment(
                comment.id,
                comment?.upVotesBy?.includes(authUser?.data?.user?.id)
                  ? "neutral"
                  : "upvote",
              );
            }}
            handleDownVoteComment={() => {
              handleToggleVoteComment(
                comment.id,
                comment?.downVotesBy?.includes(authUser?.data?.user?.id)
                  ? "neutral"
                  : "downvote",
              );
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
