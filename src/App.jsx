// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";

import { HomePage, LoginPage, RegisterPage } from "./pages";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import asyncPreloadProcess from "./states/isPreload/action";

const App = () => {
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <LoadingBar />

        <div>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="app-container">
        <header>
          <button onClick={onSignOut}>Sign Out</button>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
