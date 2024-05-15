import { ActionType } from "./action";

const threadsDetailsReducer = (threadsDetails = {}, action = {}) => {
  switch (action.type) {
    case ActionType.FETCH_THREAD:
      return action.payload.thread.data.detailThread;
    case ActionType.UP_VOTE_THREAD:
      return {
        ...threadsDetails,
        upVotesBy: threadsDetails.upVotesBy.includes(action.payload.userId)
          ? threadsDetails.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
          : threadsDetails.upVotesBy.concat([action.payload.userId]),
        downVotesBy: threadsDetails.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };

    case ActionType.DOWN_VOTE_THREAD:
      return {
        ...threadsDetails,
        downVotesBy: threadsDetails.downVotesBy.includes(action.payload.userId)
          ? threadsDetails.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
          : threadsDetails.downVotesBy.concat([action.payload.userId]),
        upVotesBy: threadsDetails.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.NEUTRALIZE_THREAD:
      return {
        ...threadsDetails,
        upVotesBy: threadsDetails.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: threadsDetails.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.CREATE_COMMENT:
      return {
        ...threadsDetails,
        comments: [
          action.payload.comment.data.comment,
          ...threadsDetails.comments,
        ],
      };
    case ActionType.UP_VOTE_COMMENT:
      return {
        ...threadsDetails,
        comments: threadsDetails.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy.concat([action.payload.userId]),
              downVotesBy: comment.downVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
          return comment;
        }),
      };
    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...threadsDetails,
        comments: threadsDetails.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId,
                  )
                : comment.downVotesBy.concat([action.payload.userId]),
              upVotesBy: comment.upVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
          return comment;
        }),
      };
    case ActionType.NEUTRALIZE_COMMENT:
      return {
        ...threadsDetails,
        comments: threadsDetails.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
              downVotesBy: comment.downVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
          return comment;
        }),
      };
    default:
      return threadsDetails;
  }
};

export default threadsDetailsReducer;
