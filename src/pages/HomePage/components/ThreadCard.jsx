import React from "react";
import { Link } from "react-router-dom";
import { LiaComments } from "react-icons/lia";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";

import { formatTimestamp } from "@/utils";
import { Button } from "@/components/ui/button";

const ThreadCard = (props) => {
  const { thread, authUser, handleToggleVoteThread } = props;

  return (
    <div className="rounded-lg border bg-white p-3 transition duration-300 ease-in-out hover:shadow-md">
      <p className="inline-block max-w-max rounded-md border px-2 py-1 text-sm">
        #{thread.category}
      </p>
      <Button variant="link" className="block pl-0 font-semibold" asChild>
        <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
      </Button>
      <article
        className="prose-sm line-clamp-2 max-w-none flex-col"
        dangerouslySetInnerHTML={{ __html: thread.body }}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <p className="text-sm">Dibuat {formatTimestamp(thread.createdAt)}</p>
          <p className="text-sm">
            oleh <span className="font-medium">{thread.owner.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={() => {
              handleToggleVoteThread(
                thread.id,
                thread.upVotesBy.includes(authUser?.data?.user?.id)
                  ? "neutral"
                  : "upvote",
              );
            }}
          >
            {thread.upVotesBy.includes(authUser?.data?.user?.id) ? (
              <BiSolidUpvote className="mr-2 text-sm" />
            ) : (
              <BiUpvote className="mr-2 text-sm" />
            )}
            <p>{thread.upVotesBy.length}</p>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={() => {
              handleToggleVoteThread(
                thread.id,
                thread.downVotesBy.includes(authUser?.data?.user?.id)
                  ? "neutral"
                  : "downvote",
              );
            }}
          >
            {thread.downVotesBy?.includes(authUser?.data?.user?.id) ? (
              <BiSolidDownvote className="mr-2 text-sm" />
            ) : (
              <BiDownvote className="mr-2 text-sm" />
            )}
            <p>{thread.downVotesBy.length}</p>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/threads/${thread.id}`} className="flex items-center">
              <LiaComments className="mr-2 text-sm" />
              <p>{thread.totalComments}</p>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
