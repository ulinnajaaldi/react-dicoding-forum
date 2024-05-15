import { axiosInstance, axiosInstanceWithAuth } from "@/lib/axios";

const upVote = async (threadId) => {
  const response = await axiosInstanceWithAuth.post(
    `/threads/${threadId}/up-vote`,
  );

  return response.data;
};

const downVote = async (threadId) => {
  const response = await axiosInstanceWithAuth.post(
    `/threads/${threadId}/down-vote`,
  );

  return response.data;
};

const neutralizeVote = async (threadId) => {
  const response = await axiosInstanceWithAuth.post(
    `/threads/${threadId}/neutral-vote`,
  );

  return response.data;
};

const upVoteComment = async (threadId, commentId) => {
  const response = await axiosInstanceWithAuth.post(
    `/threads/${threadId}/comments/${commentId}/up-vote`,
  );

  return response.data;
};

const downVoteComment = async (threadId, commentId) => {
  const response = await axiosInstanceWithAuth.post(
    `/threads/${threadId}/comments/${commentId}/down-vote`,
  );

  return response.data;
};

const neutralizeVoteComment = async (threadId, commentId) => {
  const response = await axiosInstanceWithAuth.post(
    `/threads/${threadId}/comments/${commentId}/neutral-vote`,
  );

  return response.data;
};

export const VotesServices = {
  upVote,
  downVote,
  neutralizeVote,
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
};
