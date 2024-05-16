import { hideLoading, showLoading } from "react-redux-loading-bar";
import { toast } from "sonner";

import { ThreadsServices } from "@/service/ThreadsServices";
import { VotesServices } from "@/service/VotesServices";

export const ActionType = {
  FETCH_THREADS: "FETCH_THREADS",
  CREATE_THREAD: "CREATE_THREAD",
  UP_VOTE_THREAD: "UP_VOTE_THREAD",
  DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
  NEUTRALIZE_THREAD: "NEUTRALIZE_THREAD",
};

export const fetchThreadsActionCreator = (threads) => ({
  type: ActionType.FETCH_THREADS,
  payload: {
    threads,
  },
});

export const createThreadActionCreator = (thread) => ({
  type: ActionType.CREATE_THREAD,
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

export const asyncFetchThreads = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const threads = await ThreadsServices.getAll();
    dispatch(fetchThreadsActionCreator(threads));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(hideLoading());
  }
};

export const asyncCreateThread =
  ({ title, body, category }) =>
  async (dispatch) => {
    try {
      const thread = await ThreadsServices.create({ title, body, category });
      dispatch(createThreadActionCreator(thread));
      toast.success(thread.message, {
        description: "Thread berhasil dibuat",
      });
    } catch (error) {
      console.error(error);
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
