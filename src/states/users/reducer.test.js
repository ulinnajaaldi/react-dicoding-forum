/* eslint-disable prettier/prettier */

import { describe, it, expect } from "vitest";
import userReducer from "./reducer";

describe("user reducer", () => {
  it("should return the initial state", () => {
    const initialState = [];
    const action = { type: "unknown" };

    const nextState = userReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it("should handle RECEIVE_USER", () => {
    const initialState = [];

    const action = {
      type: "RECEIVE_USER",
      payload: {
        user: {
          id: "jane_doe",
          name: "Jane Doe",
          email: "jane@example.com",
          avatar: "https://generated-image-url.jpg",
        },
      },
    };

    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual(action.payload.user);
  });

  it("should handle FETCH_USERS", () => {
    const initialState = [];

    const action = {
      type: "FETCH_USERS",
      payload: {
        users: {
          data: {
            users: [
              {
                id: "jane_doe",
                name: "Jane Doe",
                email: "jane@example.com",
                avatar: "https://generated-image-url.jpg",
              },
            ],
          },
        },
      },
    };

    const nextState = userReducer(initialState, action);

    expect(nextState).toEqual(action.payload.users);
  });
});
