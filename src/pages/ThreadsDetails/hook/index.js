import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { showErrorToastLogin } from "@/utils";
import {
  asyncCreateComment,
  asyncFetchThread,
  asyncToggleVoteComment,
  asyncToggleVoteThread,
} from "@/states/threadsDetails/action";

const useThreadsDetailsFeature = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { threadsDetails = {}, authUser } = useSelector((states) => states);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(asyncFetchThread(params.id)).then(() => {
      setIsLoading(false);
    });
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
      showErrorToastLogin(navigate);
    }
  };

  const handleUpVoteThread = () => {
    handleToggleVoteThread(
      threadsDetails?.upVotesBy?.includes(authUser?.data?.user?.id)
        ? "neutral"
        : "upvote",
    );
  };

  const handleDownVoteThread = () => {
    handleToggleVoteThread(
      threadsDetails?.downVotesBy?.includes(authUser?.data?.user?.id)
        ? "neutral"
        : "downvote",
    );
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
      showErrorToastLogin(navigate);
    }
  };

  const handleComment = ({ content }) => {
    dispatch(asyncCreateComment({ threadId: params?.id, content }));
  };

  return {
    threadsDetails,
    authUser,
    content,
    setContent,
    handleToggleVoteComment,
    handleUpVoteThread,
    handleDownVoteThread,
    handleComment,
    isLoading,
  };
};

export default useThreadsDetailsFeature;
