import { CommentServices } from "@/service/CommentServices";
import { ThreadsServices } from "@/service/ThreadsServices";
import { VotesServices } from "@/service/VotesServices";
import { hideLoading } from "react-redux-loading-bar";
import { showLoading } from "react-redux-loading-bar";
import { toast } from "sonner";

export const ActionType = {
  FETCH_THREAD: "FETCH_THREAD",
  UP_VOTE_THREAD: "UP_VOTE_THREAD",
  DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
  NEUTRALIZE_THREAD: "NEUTRALIZE_THREAD",
  CREATE_COMMENT: "CREATE_COMMENT",
  UP_VOTE_COMMENT: "UP_VOTE_COMMENT",
  DOWN_VOTE_COMMENT: "DOWN_VOTE_COMMENT",
  NEUTRALIZE_COMMENT: "NEUTRALIZE_COMMENT",
};

export const fetchThreadActionCreator = (thread) => ({
  type: ActionType.FETCH_THREAD,
  payload: {
    thread,
  },
});

export const upVoteThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.UP_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

export const downVoteThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.DOWN_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

export const neutralizeThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.NEUTRALIZE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

export const createCommentActionCreator = (comment) => ({
  type: ActionType.CREATE_COMMENT,
  payload: {
    comment,
  },
});

export const upVoteCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.UP_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

export const downVoteCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.DOWN_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

export const neutralizeCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.NEUTRALIZE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

export const asyncFetchThread = (threadId) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const thread = await ThreadsServices.getDetails(threadId);
    dispatch(fetchThreadActionCreator(thread));
  } catch (error) {
    toast.error(error?.response?.data?.message || "Thread tidak ditemukan");
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncCreateComment =
  ({ threadId, content }) =>
  async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await CommentServices.create({
        threadId,
        content,
      });

      dispatch(createCommentActionCreator(comment));
      toast.success("Berhasil menambahkan komentar");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Gagal menambahkan komentar",
      );
    } finally {
      dispatch(hideLoading());
    }
  };

export const asyncToggleVoteThread =
  ({ threadId, userId, vote }) =>
  async (dispatch) => {
    switch (vote) {
      case "upvote":
        try {
          await VotesServices.upVote(threadId);
          dispatch(upVoteThreadActionCreator({ threadId, userId }));
        } catch (error) {
          console.error(error);
        }
        break;
      case "downvote":
        try {
          await VotesServices.downVote(threadId);
          dispatch(downVoteThreadActionCreator({ threadId, userId }));
        } catch (error) {
          console.error(error);
        }
        break;
      case "neutral":
        try {
          await VotesServices.neutralizeVote(threadId);
          dispatch(neutralizeThreadActionCreator({ threadId, userId }));
        } catch (error) {
          console.error(error);
        }
        break;
      default: {
        break;
      }
    }
  };

export const asyncToggleVoteComment =
  ({ threadId, commentId, userId, vote }) =>
  async (dispatch) => {
    switch (vote) {
      case "upvote":
        dispatch(showLoading());
        try {
          await VotesServices.upVoteComment(threadId, commentId);
          dispatch(upVoteCommentActionCreator({ commentId, userId }));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(hideLoading());
        }
        break;
      case "downvote":
        dispatch(showLoading());
        try {
          await VotesServices.downVoteComment(threadId, commentId);
          dispatch(downVoteCommentActionCreator({ commentId, userId }));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(hideLoading());
        }
        break;
      case "neutral":
        dispatch(showLoading());
        try {
          await VotesServices.neutralizeVoteComment(threadId, commentId);
          dispatch(neutralizeCommentActionCreator({ commentId, userId }));
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(hideLoading());
        }
        break;
      default: {
        break;
      }
    }
  };
