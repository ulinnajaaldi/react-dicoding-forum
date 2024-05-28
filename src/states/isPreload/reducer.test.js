//  * Skenario Test
//  Should return the initial state
//  Should handle SET_IS_PRELOAD

import { describe, it, expect } from "vitest";

import isPreloadReducer from "./reducer";

describe("isPreload reducer", () => {
  it("should return the initial state", () => {
    const initialState = true;
    const action = { type: "unknown" };

    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it("should handle SET_IS_PRELOAD", () => {
    const initialState = false;

    const action = {
      type: "SET_IS_PRELOAD",
      payload: {
        isPreload: true,
      },
    };

    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toEqual(action.payload.isPreload);
  });
});
