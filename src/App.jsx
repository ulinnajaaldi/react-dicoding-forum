// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";

import { asyncUnsetAuthUser } from "@/states/authUser/action";
import asyncPreloadProcess from "@/states/isPreload/action";
import { CreateThreadPage, HomePage, LoginPage, RegisterPage } from "@/pages";
import Homepage from "@/pages/HomePage";
import Navbar from "@/components/layout/navbar";
import ThreadDetails from "./pages/ThreadsDetails";

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

  return (
    <>
      <div className="sticky top-0 z-40">
        <LoadingBar />
      </div>
      <>
        <Navbar authUser={authUser} onSignOut={onSignOut} />
        <main>
          <Routes>
            <Route
              path="/login"
              element={authUser ? <HomePage /> : <LoginPage />}
            />
            <Route
              path="/register"
              element={authUser ? <HomePage /> : <RegisterPage />}
            />
            <Route path="/" element={<Navigate to="/threads" />} />
            <Route path="/threads" element={<Homepage />} />
            <Route path="/threads/:id" element={<ThreadDetails />} />
            <Route path="/create-thread" element={<CreateThreadPage />} />
          </Routes>
        </main>
      </>
    </>
  );
};

export default App;
