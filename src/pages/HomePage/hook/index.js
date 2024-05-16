/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  asyncFetchThreads,
  asyncToggleVoteThread,
} from "@/states/threads/action";
import { asyncFetchUsers } from "@/states/users/action";
import { showErrorToastLogin } from "@/utils";

const useHomepageFeature = () => {
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
      showErrorToastLogin(navigate);
    }
  };

  return {
    authUser,
    category,
    setCategory,
    categories,
    newThreads,
    handleToggleVoteThread,
  };
};

export default useHomepageFeature;
