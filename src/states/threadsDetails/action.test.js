/* eslint-disable no-unused-expressions */

// * Skenario Test
//  Should dispatch fetchThreadActionCreator with the fetched thread details
//  Should dispatch createCommentActionCreator with the created comment success
//  Should not dispatch createCommentActionCreator when failed to create comment

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { toast } from "sonner";

import { ThreadsServices } from "@/service/ThreadsServices";
import { CommentServices } from "@/service/CommentServices";
import {
  asyncCreateComment,
  asyncFetchThread,
  createCommentActionCreator,
  fetchThreadActionCreator,
} from "./action";

const fakeThreadDetails = {
  id: "thread-1",
  title: "Thread Pertama",
  body: "Ini adalah thread pertama",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  owner: {
    id: "users-1",
    name: "John Doe",
    avatar: "https://generated-image-url.jpg",
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: "comment-1",
      content: "Ini adalah komentar pertama",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

const fakeCreateComment = {
  content: "Ini adalah komentar kedua",
};

const fakeCreateCommentResponse = {
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
};

const fakeErrorResponse = new Error("Ups, something went wrong");

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("asyncFetchThreadDetailsThunk", () => {
  beforeEach(() => {
    ThreadsServices.getDetails;
  });

  afterEach(() => {
    ThreadsServices.getDetails;

    delete ThreadsServices.getDetails;
  });

  it("should dispatch fetchThreadDetailsActionCreator with the fetched thread details", async () => {
    // arrange
    ThreadsServices.getDetails = () => Promise.resolve(fakeThreadDetails);

    const dispatch = vi.fn();

    // action
    await asyncFetchThread("thread-1")(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(
      fetchThreadActionCreator(fakeThreadDetails),
    );
  });
});

describe("asyncCreateCommentThunk", () => {
  beforeEach(() => {
    CommentServices.create;
  });

  afterEach(() => {
    CommentServices.create;

    delete CommentServices.create;
  });

  it("should dispatch createCommentActionCreator with the created comment success", async () => {
    // arrange
    CommentServices.create = () => Promise.resolve(fakeCreateCommentResponse);

    const dispatch = vi.fn();

    // action
    await asyncCreateComment(fakeCreateComment)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(
      createCommentActionCreator(fakeCreateCommentResponse),
    );
    expect(toast.success).toHaveBeenCalledWith("Berhasil menambahkan komentar");
  });

  it("should not dispatch createCommentActionCreator when failed to create comment", async () => {
    // arrange
    CommentServices.create = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    // action
    await asyncCreateComment(fakeCreateComment)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(
      createCommentActionCreator(fakeCreateCommentResponse),
    );
    expect(toast.error).toHaveBeenCalledWith("Gagal menambahkan komentar");
  });
});
