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
      <h1 className="text-2xl font-bold">{threadsDetails?.title}</h1>

      <article
        className="prose max-w-none flex-col"
        dangerouslySetInnerHTML={{ __html: threadsDetails?.body }}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <p className="text-sm md:text-base">
            Dibuat {formatTimestamp(threadsDetails?.createdAt)} oleh
          </p>
          <div className="flex items-center justify-center gap-1">
            <img
              src={threadsDetails?.owner?.avatar}
              alt={threadsDetails?.owner?.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <p className="text-sm font-medium md:text-base">
              {threadsDetails?.owner?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
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
