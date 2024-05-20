/* eslint-disable prettier/prettier */

import { describe, it, expect } from "vitest";
import threadsReducer from "./reducer";

describe("threads reducer", () => {
  it("should return the initial state", () => {
    const initialState = [];
    const action = { type: "unknown" };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it("should return the threads when given by FETCH_THREADS", () => {
    const initialState = [];
    const action = {
      type: "FETCH_THREADS",
      payload: {
        threads: {
          data: {
            threads: [
              {
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
              {
                id: "thread-2",
                title: "Thread Kedua",
                body: "Ini adalah thread kedua",
                category: "General",
                createdAt: "2021-06-21T07:00:00.000Z",
                ownerId: "users-2",
                upVotesBy: [],
                downVotesBy: [],
                totalComments: 0,
              },
            ],
          },
        },
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threads.data.threads);
  });

  it("should add a new thread when given by CREATE_THREAD", () => {
    const initialState = [
      {
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
    ];
    const action = {
      type: "CREATE_THREAD",
      payload: {
        thread: {
          data: {
            thread: {
              id: "thread-2",
              title: "Thread Kedua",
              body: "Ini adalah thread kedua",
              category: "General",
              createdAt: "2021-06-21T07:00:00.000Z",
              ownerId: "users-2",
              upVotesBy: [],
              downVotesBy: [],
              totalComments: 0,
            },
          },
        },
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      action.payload.thread.data.thread,
      ...initialState,
    ]);
  });

  it("should toggle up vote a thread when given by UP_VOTE_THREAD", () => {
    const initialState = [
      {
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
    ];
    const action = {
      type: "UP_VOTE_THREAD",
      payload: {
        threadId: "thread-1",
        userId: "users-2",
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: ["users-2"],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });

  it("should toggle down vote a thread when given by DOWN_VOTE_THREAD", () => {
    const initialState = [
      {
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
    ];
    const action = {
      type: "DOWN_VOTE_THREAD",
      payload: {
        threadId: "thread-1",
        userId: "users-2",
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: ["users-2"],
        totalComments: 0,
      },
    ]);
  });

  it("should neutralize a thread when given by NEUTRALIZE_THREAD", () => {
    const initialState = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: ["users-2"],
        downVotesBy: ["users-3"],
        totalComments: 0,
      },
    ];
    const action = {
      type: "NEUTRALIZE_THREAD",
      payload: {
        threadId: "thread-1",
        userId: "users-2",
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: ["users-3"],
        totalComments: 0,
      },
    ]);
  });
});
