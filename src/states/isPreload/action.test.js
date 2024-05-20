/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import { UsersServices } from "@/service/UsersServices";
import asyncPreloadProcess from "./action";
import { setAuthUserActionCreator } from "../authUser/action";

const fakeAuthUserResponse = [
  {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncPreloadProcess", () => {
  beforeEach(() => {
    UsersServices.getOwnProfile;
  });

  afterEach(() => {
    UsersServices.getOwnProfile;

    delete UsersServices.getOwnProfile;
  });

  it("should dispatch setAuthUserActionCreator with the fetched authUser", async () => {
    UsersServices.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse),
    );
  });

  it("should dispatch setAuthUserActionCreator with null if the request failed", async () => {
    UsersServices.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
  });
});
