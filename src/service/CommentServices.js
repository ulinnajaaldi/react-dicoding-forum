import { axiosInstanceWithAuth } from "@/lib/axios";

const create = async ({ threadId, content }) => {
  const response = await axiosInstanceWithAuth.post(
    `/threads/${threadId}/comments`,
    {
      content,
    },
  );
  return response.data;
};

export const CommentServices = {
  create,
};
