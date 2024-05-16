import React from "react";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";

import { formatTimestamp } from "@/utils";
import { Button } from "@/components/ui/button";

const CommentCard = (props) => {
  const { authUser, comment, handleUpVoteComment, handleDownVoteComment } =
    props;

  return (
    <div className="space-y-2 border-b pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img
            src={comment?.owner?.avatar}
            alt={comment?.owner?.name}
            className="h-6 w-6 rounded-full object-cover md:h-8 md:w-8"
          />
          <p className="text-xs font-medium md:text-sm">
            {comment?.owner?.name}
          </p>
        </div>
        <p className="text-xs md:text-sm">
          {comment?.createdAt ? formatTimestamp(comment?.createdAt) : null}
        </p>
      </div>
      <article
        className="prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: comment?.content }}
      />
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={handleUpVoteComment}
        >
          {comment?.upVotesBy?.includes(authUser?.data?.user?.id) ? (
            <BiSolidUpvote className="mr-2 text-sm" />
          ) : (
            <BiUpvote className="mr-2 text-sm" />
          )}
          <p>{comment?.upVotesBy?.length}</p>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={handleDownVoteComment}
        >
          {comment?.downVotesBy?.includes(authUser?.data?.user?.id) ? (
            <BiSolidDownvote className="mr-2 text-sm" />
          ) : (
            <BiDownvote className="mr-2 text-sm" />
          )}
          <p>{comment?.downVotesBy?.length}</p>
        </Button>
      </div>
    </div>
  );
};

export default CommentCard;
