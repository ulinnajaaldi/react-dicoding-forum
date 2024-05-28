// * Skenario Test
//  Should return the initial state
//  Should return the thread when given by FETCH_THREAD
//  Should toggle up vote a thread when given by UP_VOTE_THREAD
//  Should toggle down vote a thread when given by DOWN_VOTE_THREAD
//  Should neutralize a thread when given by NEUTRALIZE_THREAD
//  Should add a comment when given by CREATE_COMMENT
//  Should toggle up vote a comment when given by UP_VOTE_COMMENT
//  Should toggle down vote a comment when given by DOWN_VOTE_COMMENT
//  Should neutralize a comment when given by NEUTRALIZE_COMMENT

import { describe, it, expect } from "vitest";
import threadsDetailsReducer from "./reducer";

describe("threadsDetails reducer", () => {
  it("should return the initial state", () => {
    const initialState = {};
    const action = { type: "unknown" };

    const nextState = threadsDetailsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it("should return the thread when given by FETCH_THREAD", () => {
    const initialState = {};
    const action = {
      type: "FETCH_THREAD",
      payload: {
        thread: {
          data: {
            detailThread: {
              id: "thread-1",
              title: "Thread Pertama",
              body: "Ini adalah thread pertama",
              category: "General",
              createdAt: "2021-06-21T07:00:00.000Z",
              ownerId: "users-1",
              upVotesBy: [],
              downVotesBy: [],
              totalComments: 0,
            },
          },
        },
      },
    };

    const nextState = threadsDetailsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.thread.data.detailThread);
  });

  it("should toggle up vote a thread when given by UP_VOTE_THREAD", () => {
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-1",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const action = {
      type: "UP_VOTE_THREAD",
      payload: {
        userId: "users-1",
      },
    };

    const nextState = threadsDetailsReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
    });
  });

  it("should toggle down vote a thread when given by DOWN_VOTE_THREAD", () => {
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-1",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const action = {
      type: "DOWN_VOTE_THREAD",
      payload: {
        userId: "users-1",
      },
    };

    const nextState = threadsDetailsReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload.userId],
    });
  });

  it("should neutralize a thread when given by NEUTRALIZE_THREAD", () => {
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-1",
      upVotesBy: ["users-1"],
      downVotesBy: ["users-1"],
      totalComments: 0,
    };
    const action = {
      type: "NEUTRALIZE_THREAD",
      payload: {
        userId: "users-1",
      },
    };

    const nextState = threadsDetailsReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it("should add a comment when given by CREATE_COMMENT", () => {
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-1",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
      comments: [],
    };
    const action = {
      type: "CREATE_COMMENT",
      payload: {
        comment: {
          data: {
            id: "comment-1",
            content: "Ini adalah komentar pertama",
            createdAt: "2021-06-21T07:00:00.000Z",
            upVotesBy: [],
            downVotesBy: [],
            owner: {
              id: "users-1",
              name: "John Doe",
              email: "john@example.com",
            },
          },
        },
      },
    };

    const nextState = threadsDetailsReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment.data.comment],
    });
  });

  it("should toggle up vote a comment when given by UP_VOTE_COMMENT", () => {
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-1",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: "users-1",
            name: "John Doe",
            email: "john@example.com",
          },
        },
      ],
    };

    const action = {
      type: "UP_VOTE_COMMENT",
      payload: {
        commentId: "comment-1",
        userId: "users-1",
      },
    };

    const nextState = threadsDetailsReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          upVotesBy: [action.payload.userId],
          downVotesBy: [],
          owner: {
            id: "users-1",
            name: "John Doe",
            email: "john@example.com",
          },
        },
      ],
    });
  });

  it("should toggle down vote a comment when given by DOWN_VOTE_COMMENT", () => {
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-1",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: "users-1",
            name: "John Doe",
            email: "john@example.com",
          },
        },
      ],
    };

    const action = {
      type: "DOWN_VOTE_COMMENT",
      payload: {
        commentId: "comment-1",
        userId: "users-1",
      },
    };

    const nextState = threadsDetailsReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          upVotesBy: [],
          downVotesBy: [action.payload.userId],
          owner: {
            id: "users-1",
            name: "John Doe",
            email: "john@example.com",
          },
        },
      ],
    });
  });

  it("should neutralize a comment when given by NEUTRALIZE_COMMENT", () => {
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-1",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          upVotesBy: ["users-1"],
          downVotesBy: ["users-1"],
          owner: {
            id: "users-1",
            name: "John Doe",
            email: "john@example.com",
          },
        },
      ],
    };

    const action = {
      type: "NEUTRALIZE_COMMENT",
      payload: {
        commentId: "comment-1",
        userId: "users-1",
      },
    };

    const nextState = threadsDetailsReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: "users-1",
            name: "John Doe",
            email: "john@example.com",
          },
        },
      ],
    });
  });
});
