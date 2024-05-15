import { ActionType } from "./action";

const threadsReducer = (threads = [], action = {}) => {
  switch (action.type) {
    case ActionType.FETCH_THREADS:
      return action.payload.threads.data.threads;
    case ActionType.CREATE_THREAD:
      return action.payload.thread;
    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy.concat([action.payload.userId]),
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          };
        }
        return thread;
      });
    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy.concat([action.payload.userId]),
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          };
        }
        return thread;
      });

    case ActionType.NEUTRALIZE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          };
        }
        return thread;
      });
    default:
      return threads;
  }
};

export default threadsReducer;
