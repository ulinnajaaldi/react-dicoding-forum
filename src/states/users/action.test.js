/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */

// * Skenario Test
//  Should dispatch receiveUsersActionCreator when register success
//  Should not dispatch receiveUsersActionCreator when register failed

import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";

import { UsersServices } from "@/service/UsersServices";
import { asyncRegisterUser, receiveUsersActionCreator } from "./action";

const fakeUser = {
  id: "user-123",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://generated-image-url.jpg",
};

const fakeRegisterUser = {
  name: "Jane Doe",
  email: "jane@example.com",
  password: "123456",
};

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncRegisterUserThunk", () => {
  beforeEach(() => {
    UsersServices.register;
  });

  afterEach(() => {
    UsersServices.register;

    delete UsersServices.register;
  });

  it("should dispatch receiveUsersActionCreator when register success", async () => {
    // arrange
    UsersServices.register = () => Promise.resolve(fakeUser);

    const dispatch = vi.fn();

    // action
    await asyncRegisterUser(fakeRegisterUser)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUser));
  });

  it("should dispatch receiveUsersActionCreator when register failed", async () => {
    // arrange
    UsersServices.register = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    // action
    await asyncRegisterUser(fakeRegisterUser)(dispatch);

    // assert
    expect(dispatch).not.toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUser),
    );
  });
});
