import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { LiaComments } from "react-icons/lia";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { formatTimestamp } from "@/utils";
import {
  asyncFetchThreads,
  asyncToggleVoteThread,
} from "@/states/threads/action";
import { asyncFetchUsers } from "@/states/users/action";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/layout/page-wrapper";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { threads, users, authUser } = useSelector((states) => states);
  const [category, setCategory] = useState("");

  useEffect(() => {
    Promise.all([dispatch(asyncFetchThreads()), dispatch(asyncFetchUsers())]);
  }, [dispatch]);

  const categories = threads?.reduce((unique, thread) => {
    return unique.includes(thread.category)
      ? unique
      : [...unique, thread.category];
  }, []);

  const newThreads = threads
    ?.map((thread) => {
      if (thread.category !== null) {
        const user = users?.data?.users.find(
          (user) => user.id === thread.ownerId,
        );

        return {
          ...thread,
          owner: { ...user },
        };
      }
    })
    .filter((thread) => {
      if (category) {
        return thread?.category === category;
      }

      return thread;
    });

  const handleToggleVoteThread = (threadId, vote) => {
    if (authUser) {
      dispatch(
        asyncToggleVoteThread({
          threadId,
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

  return (
    <PageWrapper>
      <section className="text-center">
        <div className="container max-w-2xl py-10">
          <h1 className="mt-2 text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Dicoding Forum React Redux
          </h1>

          <p className="mt-6 text-balance text-lg leading-8 text-gray-600">
            Forum simple yang dibuat dengan React dan Redux Toolkit
          </p>

          <div className="mt-8 flex justify-center">
            <Button size="sm" variant="outline" className="mt-2" asChild>
              <Link to="/leaderboard">
                Lihat Leaderboard
                <ArrowRightIcon className="ml-2 inline-block h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-col">
            {categories?.length > 0 && (
              <h3 className="text-sm font-semibold text-gray-900">
                Kategori Populer
              </h3>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories?.map((cat, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={cat === category ? "default" : "outline"}
                  className="mt-2"
                  onClick={() => setCategory(cat === category ? "" : cat)}
                >
                  #{cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-10 max-w-2xl">
        <div className="flex flex-col gap-3">
          {newThreads?.map((thread) => (
            <div
              key={thread.id}
              className="rounded-lg border bg-white p-3 transition duration-300 ease-in-out hover:shadow-md"
            >
              <p className="inline-block max-w-max rounded-md border px-2 py-1 text-sm">
                #{thread.category}
              </p>
              <Button
                variant="link"
                className="block pl-0 font-semibold"
                asChild
              >
                <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
              </Button>
              <article
                className="prose-sm line-clamp-2 max-w-none flex-col"
                dangerouslySetInnerHTML={{ __html: thread.body }}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <p className="text-sm">
                    Dibuat {formatTimestamp(thread.createdAt)}
                  </p>
                  <p className="text-sm">
                    oleh{" "}
                    <span className="font-medium">{thread.owner.name}</span>
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
                    {thread.downVotesBy.includes(authUser?.data?.user?.id) ? (
                      <BiSolidDownvote className="mr-2 text-sm" />
                    ) : (
                      <BiDownvote className="mr-2 text-sm" />
                    )}
                    <p>{thread.downVotesBy.length}</p>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      to={`/threads/${thread.id}`}
                      className="flex items-center"
                    >
                      <LiaComments className="mr-2 text-sm" />
                      <p>{thread.totalComments}</p>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Homepage;
