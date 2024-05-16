import React from "react";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";

import { formatTimestamp } from "@/utils";
import { Button } from "@/components/ui/button";
import { CommentForm } from "../components";

const ThreadDetailSection = (props) => {
  const {
    threadsDetails,
    authUser,
    content,
    setContent,
    handleUpVoteThread,
    handleDownVoteThread,
    handleComment,
  } = props;

  return (
    <section className="container max-w-2xl space-y-4 pb-5 pt-10">
      <h1 className="text-xl font-bold md:text-2xl">{threadsDetails?.title}</h1>

      <article
        className="prose-sm max-w-none flex-col md:prose"
        dangerouslySetInnerHTML={{ __html: threadsDetails?.body }}
      />
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-0">
        <div className="flex items-center gap-4 md:gap-1">
          <p className="text-xs sm:text-sm md:text-base">
            Dibuat {formatTimestamp(threadsDetails?.createdAt)} oleh
          </p>
          <div className="flex items-center justify-center gap-1">
            <img
              src={threadsDetails?.owner?.avatar}
              alt={threadsDetails?.owner?.name}
              className="h-6 w-6 rounded-full object-cover md:h-8 md:w-8"
            />
            <p className="text-xs font-medium sm:text-sm md:text-base">
              {threadsDetails?.owner?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 self-end md:self-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handleUpVoteThread}
          >
            {threadsDetails?.upVotesBy?.includes(authUser?.data?.user?.id) ? (
              <BiSolidUpvote className="mr-2 text-sm" />
            ) : (
              <BiUpvote className="mr-2 text-sm" />
            )}
            <p>{threadsDetails?.upVotesBy?.length}</p>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={handleDownVoteThread}
          >
            {threadsDetails?.downVotesBy?.includes(authUser?.data?.user?.id) ? (
              <BiSolidDownvote className="mr-2 text-sm" />
            ) : (
              <BiDownvote className="mr-2 text-sm" />
            )}
            <p>{threadsDetails?.downVotesBy?.length}</p>
          </Button>
        </div>
      </div>
      <CommentForm
        authUser={authUser}
        content={content}
        setContent={setContent}
        handleComment={handleComment}
      />
    </section>
  );
};

export default ThreadDetailSection;
