/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */

// * Skenario Test
//  Should dispatch createThreadActionCreator with the created thread success
//  Should not dispatch createThreadActionCreator when failed to create thread

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { toast } from "sonner";

import { ThreadsServices } from "@/service/ThreadsServices";
import { asyncCreateThread, createThreadActionCreator } from "./action";

const fakeThreads = [
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

const fakeCreatedThread = {
  title: "Thread Kedua",
  body: "Ini adalah thread kedua",
  category: "General",
};

const fakeErrorResponse = "Failed to create thread";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("asyncCreateThreadThunk", () => {
  beforeEach(() => {
    ThreadsServices.create;
  });

  afterEach(() => {
    ThreadsServices.create;

    delete ThreadsServices.create;
  });

  it("should dispatch createThreadActionCreator with the created thread success", async () => {
    // arrange
    ThreadsServices.create = () => Promise.resolve(fakeThreads);

    const dispatch = vi.fn();

    // action
    await asyncCreateThread(fakeCreatedThread)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      createThreadActionCreator(fakeThreads),
    );
    expect(toast.success).toHaveBeenCalledWith(fakeThreads.message, {
      description: "Thread berhasil dibuat",
    });
  });

  it("should not dispatch createThreadActionCreator when failed to create thread", async () => {
    // arrange
    ThreadsServices.create = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    // action
    await asyncCreateThread(fakeCreatedThread)(dispatch);

    // assert
    expect(dispatch).not.toHaveBeenCalledWith(
      createThreadActionCreator(fakeCreatedThread),
    );
  });
});
