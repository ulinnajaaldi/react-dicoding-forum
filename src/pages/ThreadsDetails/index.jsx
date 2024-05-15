import PageWrapper from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  asyncCreateComment,
  asyncFetchThread,
  asyncToggleVoteComment,
  asyncToggleVoteThread,
} from "@/states/threadsDetails/action";
import { formatTimestamp } from "@/utils";
import React, { useState, useEffect } from "react";
import {
  BiChevronLeft,
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ThreadsDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { threadsDetails = {}, authUser } = useSelector((states) => states);
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(asyncFetchThread(params.id));
  }, [dispatch, params.id]);

  const handleToggleVoteThread = (vote) => {
    if (authUser) {
      dispatch(
        asyncToggleVoteThread({
          threadId: params?.id,
          userId: authUser?.data?.user?.id,
          vote,
        }),
      );
    } else {
      toast.error("Kamu belum login", {
        description: "Silahkan login untuk memberikan vote pada thread",
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });
    }
  };

  const handleToggleVoteComment = (commentId, vote) => {
    if (authUser) {
      dispatch(
        asyncToggleVoteComment({
          threadId: params?.id,
          commentId,
          userId: authUser?.data?.user?.id,
          vote,
        }),
      );
    } else {
      toast.error("Kamu belum login", {
        description: "Silahkan login untuk memberikan vote pada komentar",
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });
    }
  };

  const handleComment = ({ threadId, content }) => {
    dispatch(asyncCreateComment({ threadId, content }));
  };

  if (!threadsDetails?.id) {
    return (
      <PageWrapper>
        <section className="container flex h-[90vh] max-w-2xl flex-col items-center justify-center gap-3">
          <h1 className="text-2xl font-bold">Thread tidak ditemukan</h1>
          <Button onClick={() => navigate("/threads")}>Kembali</Button>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="container relative max-w-2xl">
        <div className="absolute left-8 top-0 h-full w-full">
          <Button
            variant="link"
            className="pl-0"
            onClick={() => navigate("/threads")}
          >
            <BiChevronLeft className="mr-2 h-5 w-5" />
            Kembali
          </Button>
        </div>
      </div>
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
              onClick={() => {
                handleToggleVoteThread(
                  threadsDetails?.upVotesBy?.includes(authUser?.data?.user?.id)
                    ? "neutral"
                    : "upvote",
                );
              }}
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
              onClick={() => {
                handleToggleVoteThread(
                  threadsDetails?.downVotesBy?.includes(
                    authUser?.data?.user?.id,
                  )
                    ? "neutral"
                    : "downvote",
                );
              }}
            >
              {threadsDetails?.downVotesBy?.includes(
                authUser?.data?.user?.id,
              ) ? (
                <BiSolidDownvote className="mr-2 text-sm" />
              ) : (
                <BiDownvote className="mr-2 text-sm" />
              )}
              <p>{threadsDetails?.downVotesBy?.length}</p>
            </Button>
          </div>
        </div>
        <form className="space-y-2">
          <h2 className="text-lg font-semibold">Beri Komentar</h2>
          <div className="flex flex-col gap-1">
            <Textarea
              placeholder="Tulis komentar anda"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={authUser ? false : true}
            />
            <Button
              type="submit"
              size="sm"
              disabled={authUser ? false : true}
              onClick={(e) => {
                e.preventDefault();
                handleComment({ threadId: threadsDetails?.id, content });
                setContent("");
              }}
            >
              Kirim
            </Button>
          </div>
        </form>
      </section>
      <section className="container mb-10 max-w-2xl space-y-4">
        <h2 className="text-lg font-semibold">
          Komentar ({threadsDetails?.comments?.length})
        </h2>
        <div className="space-y-6">
          {threadsDetails?.comments?.map((comment) => (
            <div key={comment.id} className="space-y-2 border-b pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <img
                    src={comment?.owner?.avatar}
                    alt={comment?.owner?.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <p className="text-sm font-medium">{comment?.owner?.name}</p>
                </div>
                <p className="text-sm">
                  {comment?.createdAt
                    ? formatTimestamp(comment?.createdAt)
                    : null}
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
                  onClick={() => {
                    handleToggleVoteComment(
                      comment.id,
                      comment?.upVotesBy?.includes(authUser?.data?.user?.id)
                        ? "neutral"
                        : "upvote",
                    );
                  }}
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
                  onClick={() => {
                    handleToggleVoteComment(
                      comment.id,
                      comment?.downVotesBy?.includes(authUser?.data?.user?.id)
                        ? "neutral"
                        : "downvote",
                    );
                  }}
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
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default ThreadsDetails;
